/**
 * MFEBridge — a thin wrapper around window.postMessage that decouples
 * the game from its host (shell) application.
 *
 * Lifecycle:
 *  1. Game boots and creates an MFEBridge instance.
 *  2. bridge.init() attaches a window message listener.
 *  3. When the game scene is ready, it calls bridge.ready().
 *     The shell can now send commands.
 *  4. Game emits domain events via bridge.emit(type, payload).
 *  5. Game subscribes to commands via bridge.on(type, handler).
 *
 * Standalone mode:
 *  When the page is opened directly (window.parent === window),
 *  the bridge becomes a no-op and the game runs unaffected.
 *
 * Message envelope (both directions):
 *  {
 *    source:  string,   // sender id ("memory-cards", "shell", ...)
 *    target:  string,   // optional recipient id; ignored if absent
 *    version: number,   // protocol version (currently 1)
 *    type:    string,   // event/command name
 *    payload: object,   // type-specific data
 *  }
 *
 * Origin policy:
 *  - In production, configure `allowedShellOrigins` with the exact
 *    shell origins (e.g. ['https://shell.example.com']).
 *  - In local dev, leaving it empty allows any origin and logs a warning.
 *  - Outgoing messages target the first allowed origin; if the list is
 *    empty, '*' is used (dev only).
 */
class MFEBridge {
    constructor({ mfeId, allowedShellOrigins = [], protocolVersion = 1 } = {}) {
        if (!mfeId) {
            throw new Error('[MFEBridge] mfeId is required');
        }
        this.mfeId = mfeId;
        this.allowedShellOrigins = Array.isArray(allowedShellOrigins) ? allowedShellOrigins : [];
        this.protocolVersion = protocolVersion;
        this.handlers = new Map();
        this.isEmbedded = window.parent !== window;
        this._onMessage = this._onMessage.bind(this);
        this._initialized = false;
    }

    /** Attach the global message listener. Safe to call once. */
    init() {
        if (this._initialized) return;
        this._initialized = true;

        if (!this.isEmbedded) {
            // standalone — nothing to listen for
            console.info(`[MFEBridge] standalone mode (mfeId=${this.mfeId})`);
            return;
        }
        if (this.allowedShellOrigins.length === 0) {
            console.warn(
                `[MFEBridge] allowedShellOrigins is empty — accepting any origin. ` +
                `Set it before deploying.`
            );
        }
        window.addEventListener('message', this._onMessage);
    }

    /**
     * Subscribe to a command of a given type. Returns an unsubscribe function.
     */
    on(type, handler) {
        if (!this.handlers.has(type)) {
            this.handlers.set(type, new Set());
        }
        const set = this.handlers.get(type);
        set.add(handler);
        return () => set.delete(handler);
    }

    /** Send an event to the parent shell. No-op in standalone mode. */
    emit(type, payload = {}) {
        if (!this.isEmbedded) return;
        const targetOrigin = this.allowedShellOrigins[0] || '*';
        const message = {
            source: this.mfeId,
            version: this.protocolVersion,
            type,
            payload,
        };
        window.parent.postMessage(message, targetOrigin);
    }

    /** Tell the shell we're booted and ready to receive commands. */
    ready(extra = {}) {
        this.emit('ready', { mfeId: this.mfeId, version: this.protocolVersion, ...extra });
    }

    /** Cleanup, e.g. before the game is torn down. */
    destroy() {
        window.removeEventListener('message', this._onMessage);
        this.handlers.clear();
        this._initialized = false;
    }

    // --- private ---

    _isOriginAllowed(origin) {
        if (this.allowedShellOrigins.length === 0) return true; // dev mode
        return this.allowedShellOrigins.includes(origin);
    }

    _onMessage(event) {
        if (!this._isOriginAllowed(event.origin)) return;

        const data = event.data;
        if (!data || typeof data !== 'object' || typeof data.type !== 'string') return;
        // If a target is specified, only handle messages addressed to us.
        if (data.target && data.target !== this.mfeId) return;

        const handlers = this.handlers.get(data.type);
        if (!handlers || handlers.size === 0) return;

        for (const handler of handlers) {
            try {
                handler(data.payload || {}, event);
            } catch (err) {
                console.error(`[MFEBridge] handler for "${data.type}" threw:`, err);
            }
        }
    }
}
