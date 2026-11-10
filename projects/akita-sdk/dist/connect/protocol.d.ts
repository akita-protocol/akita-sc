import type { AuthenticatedConnectEnvelope, ConnectRequest, ConnectResponse, SessionKeyConnectRequest, SessionKeySession, WalletConnectFinalizeRequest, WalletConnectRequest, WalletConnectSession } from './types';
export declare function createConnectSecret(): string;
export declare function createConnectNonce(): string;
export declare function authenticateConnectMessage<T extends ConnectRequest | ConnectResponse>(params: {
    requestId: string;
    secret: string;
    payload: T;
    issuedAt?: number;
    expiresAt?: number;
    nonce?: string;
}): AuthenticatedConnectEnvelope<T>;
export declare function verifyConnectMessage<T extends ConnectRequest | ConnectResponse>(params: {
    envelope: AuthenticatedConnectEnvelope<T>;
    requestId: string;
    secret: string;
    now?: number;
    consumeNonce?: (nonce: string) => boolean;
}): T;
export declare function validateConnectPayload(payload: ConnectRequest | ConnectResponse): void;
export declare function validateWalletConnectRequest(request: WalletConnectRequest): void;
export declare function validateSessionKeyConnectRequest(request: SessionKeyConnectRequest): void;
export declare function validateSessionKeySession(session: SessionKeySession): void;
export declare function validateWalletConnectFinalizeRequest(request: WalletConnectFinalizeRequest): void;
export declare function validateWalletConnectSession(session: WalletConnectSession): void;
export declare function createNonceTracker(): (nonce: string) => boolean;
