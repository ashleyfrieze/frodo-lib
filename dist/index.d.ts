import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Reader } from 'properties-reader';

interface NoIdObjectSkeletonInterface {
    _rev?: string;
    [k: string]: string | number | boolean | string[] | IdObjectSkeletonInterface | object | undefined;
}
interface IdObjectSkeletonInterface extends NoIdObjectSkeletonInterface {
    _id?: string;
}
type Readable<Type> = Type;
type Writable<Type> = {
    inherited: boolean;
    value?: Type;
};
type PagedResult<Type> = {
    result: Type[];
    resultCount: number;
    pagedResultsCookie: string;
    totalPagedResultsPolicy: 'EXACT' | 'NONE';
    totalPagedResults: number;
    remainingPagedResults: number;
};

interface FeatureInterface extends IdObjectSkeletonInterface {
    installedVersion: string;
    availableVersions: string[];
}

type CallbackType = 'NameCallback' | 'PasswordCallback' | 'TextInputCallback';
type CallbackKeyValuePair = {
    name: string;
    value: any;
};
type Callback = {
    type: CallbackType;
    output: CallbackKeyValuePair[];
    input: CallbackKeyValuePair[];
};
type CallbackHandler = (callback: Callback) => Callback;

type Jose = {
    createJwkRsa(): Promise<JwkRsa>;
    getJwkRsaPublic(jwkJson: JwkRsa): Promise<JwkRsaPublic>;
    createJwks(...keys: JwkInterface[]): JwksInterface;
    createSignedJwtToken(payload: string | object, jwkJson: JwkRsa): Promise<any>;
    verifySignedJwtToken(jwt: string, jwkJson: JwkRsaPublic): Promise<any>;
};
interface JwkInterface {
    kty: string;
    use?: string;
    key_ops?: string[];
    alg: string;
    kid?: string;
    x5u?: string;
    x5c?: string;
    x5t?: string;
    'x5t#S256'?: string;
}
type JwkRsa = JwkInterface & {
    d: string;
    dp: string;
    dq: string;
    e: string;
    n: string;
    p: string;
    q: string;
    qi: string;
};
type JwkRsaPublic = JwkInterface & {
    e: string;
    n: string;
};
interface JwksInterface {
    keys: JwkInterface[];
}

type AccessTokenResponseType = {
    access_token: string;
    id_token?: string;
    scope: string;
    token_type: string;
    expires_in: number;
};
type TokenInfoResponseType = {
    sub: string;
    cts: string;
    auditTrackingId: string;
    subname: string;
    iss: string;
    tokenName: string;
    token_type: string;
    authGrantId: string;
    access_token: string;
    aud: string;
    nbf: number;
    grant_type: string;
    scope: string[];
    auth_time: number;
    sessionToken?: string;
    realm: string;
    exp: number;
    iat: number;
    expires_in: number;
    jti: string;
    [k: string]: string | number | string[];
};

type AccessTokenMetaType = AccessTokenResponseType & {
    expires: number;
    from_cache?: boolean;
};
type OAuth2Oidc = {
    authorize(amBaseUrl: string, data: string, config: AxiosRequestConfig): Promise<AxiosResponse<any, any>>;
    accessToken(amBaseUrl: string, data: any, config: AxiosRequestConfig): Promise<AccessTokenMetaType>;
    accessTokenRfc7523AuthZGrant(clientId: string, jwt: string, scope: string[], config?: AxiosRequestConfig): Promise<AccessTokenMetaType>;
    getTokenInfo(amBaseUrl: string, config: AxiosRequestConfig): Promise<TokenInfoResponseType>;
    clientCredentialsGrant(amBaseUrl: string, clientId: string, clientSecret: string, scope: string): Promise<AccessTokenMetaType>;
};

type Authenticate = {
    /**
     * Get tokens and store them in State
     * @param {boolean} forceLoginAsUser true to force login as user even if a service account is available (default: false)
     * @param {boolean} autoRefresh true to automatically refresh tokens before they expire (default: true)
     * @param {CallbackHandler} callbackHandler function allowing the library to collect responses from the user through callbacks
     * @returns {Promise<Tokens>} object containing the tokens
     */
    getTokens(forceLoginAsUser?: boolean, autoRefresh?: boolean, callbackHandler?: CallbackHandler): Promise<Tokens>;
    /**
     * Get access token for service account
     * @param {string} saId optional service account id
     * @param {JwkRsa} saJwk optional service account JWK
     * @returns {string | null} Access token or null
     * @deprecated since v2.0.0 use {@link Authenticate.getTokens | getTokens} instead
     * ```javascript
     * getTokens(): Promise<boolean>
     * ```
     * @group Deprecated
     */
    getAccessTokenForServiceAccount(saId?: string, saJwk?: JwkRsa): Promise<string | null>;
};
type UserSessionMetaType = {
    tokenId: string;
    successUrl: string;
    realm: string;
    expires: number;
    from_cache?: boolean;
};
type Tokens = {
    bearerToken?: AccessTokenMetaType;
    userSessionToken?: UserSessionMetaType;
    subject?: string;
    host?: string;
    realm?: string;
};

type ProgressIndicatorType = 'determinate' | 'indeterminate';
type ProgressIndicatorStatusType = 'none' | 'success' | 'warn' | 'fail';

type State = {
    /**
     * Get a clone of the full state as an object
     * @returns a clone of the state
     */
    getState(): StateInterface;
    /**
     * Set the AM host base URL
     * @param host Access Management base URL, e.g.: https://cdk.iam.example.com/am. To use a connection profile, just specify a unique substring.
     */
    setHost(host: string): void;
    /**
     * Get the AM host base URL
     * @returns the AM host base URL
     */
    getHost(): string;
    setUsername(username: string): void;
    getUsername(): string;
    setPassword(password: string): void;
    getPassword(): string;
    setRealm(realm: string): void;
    getRealm(): string;
    setDeploymentType(type: string): void;
    getDeploymentType(): string;
    setAllowInsecureConnection(allowInsecureConnection: boolean): void;
    getAllowInsecureConnection(): boolean;
    setCookieName(name: string): void;
    getCookieName(): string;
    setUserSessionTokenMeta(value: UserSessionMetaType): void;
    getCookieValue(): string;
    getUserSessionTokenMeta(): UserSessionMetaType;
    setFeatures(features: FeatureInterface[]): void;
    getFeatures(): FeatureInterface[];
    setAuthenticationHeaderOverrides(overrides: Record<string, string>): void;
    getAuthenticationHeaderOverrides(): Record<string, string>;
    setAuthenticationService(service: string): void;
    getAuthenticationService(): string;
    setServiceAccountId(uuid: string): void;
    getServiceAccountId(): string;
    setServiceAccountJwk(jwk: JwkRsa): void;
    getServiceAccountJwk(): JwkRsa;
    setServiceAccountScope(scope: string): void;
    getServiceAccountScope(): string;
    setUseBearerTokenForAmApis(useBearerTokenForAmApis: boolean): void;
    getUseBearerTokenForAmApis(): boolean;
    setBearerTokenMeta(token: AccessTokenMetaType): void;
    getBearerToken(): string;
    getBearerTokenMeta(): AccessTokenMetaType;
    setLogApiKey(key: string): void;
    getLogApiKey(): string;
    setLogApiSecret(secret: string): void;
    getLogApiSecret(): string;
    setAmVersion(version: string): void;
    getAmVersion(): string;
    setFrodoVersion(version: string): void;
    getFrodoVersion(): string;
    setConnectionProfilesPath(path: string): void;
    getConnectionProfilesPath(): string;
    setUseTokenCache(useTokenCache: boolean): void;
    getUseTokenCache(): boolean;
    setTokenCachePath(path: string): void;
    getTokenCachePath(): string;
    setMasterKeyPath(path: string): void;
    getMasterKeyPath(): string;
    setOutputFile(file: string): void;
    getOutputFile(): string;
    setDirectory(directory: string): void;
    getDirectory(): string;
    setAutoRefreshTimer(timer: NodeJS.Timeout): void;
    getAutoRefreshTimer(): NodeJS.Timeout;
    setCurlirizeHandler(handler: (message: string) => void): void;
    getCurlirizeHandler(): (message: string) => void;
    setCurlirize(curlirize: boolean): void;
    getCurlirize(): boolean;
    setCreateProgressHandler(handler: (type: ProgressIndicatorType, total?: number, message?: string) => string): void;
    getCreateProgressHandler(): (type: ProgressIndicatorType, total?: number, message?: string) => string;
    setUpdateProgressHandler(handler: (id: string, message: string) => void): void;
    getUpdateProgressHandler(): (id: string, message: string) => void;
    setStopProgressHandler(handler: (id: string, message: string, status?: ProgressIndicatorStatusType) => void): void;
    getStopProgressHandler(): (id: string, message: string, status?: ProgressIndicatorStatusType) => void;
    setPrintHandler(handler: (message: string | object, type?: string, newline?: boolean) => void): void;
    getPrintHandler(): (message: string | object, type?: string, newline?: boolean) => void;
    setErrorHandler(handler: (error: Error, message?: string) => void): void;
    getErrorHandler(): (error: Error, message?: string) => void;
    setVerboseHandler(handler: (message: string | object) => void): void;
    getVerboseHandler(): (message: string | object) => void;
    setVerbose(verbose: boolean): void;
    getVerbose(): boolean;
    setDebugHandler(handler: (message: string | object) => void): void;
    getDebugHandler(): (message: string | object) => void;
    setDebug(debug: boolean): void;
    getDebug(): boolean;
    /**
     * Reset the state to default values
     */
    reset(): void;
    /**
     * @deprecated since v0.17.0 use `setHost(host: string)` instead
     */
    setTenant(tenant: string): void;
    /**
     * @deprecated since v0.17.0 use `getHost` instead
     */
    getTenant(): string;
};
interface StateInterface {
    host?: string;
    username?: string;
    password?: string;
    realm?: string;
    deploymentType?: string;
    allowInsecureConnection?: boolean;
    authenticationHeaderOverrides?: Record<string, string>;
    authenticationService?: string;
    cookieName?: string;
    userSessionToken?: UserSessionMetaType;
    features?: FeatureInterface[];
    serviceAccountId?: string;
    serviceAccountJwk?: JwkRsa;
    serviceAccountScope?: string;
    useBearerTokenForAmApis?: boolean;
    bearerToken?: AccessTokenMetaType;
    logApiKey?: string;
    logApiSecret?: string;
    amVersion?: string;
    frodoVersion?: string;
    connectionProfilesPath?: string;
    useTokenCache?: boolean;
    tokenCachePath?: string;
    masterKeyPath?: string;
    outputFile?: string;
    directory?: string;
    autoRefreshTimer?: NodeJS.Timeout;
    printHandler?: (message: string | object, type?: string, newline?: boolean) => void;
    errorHandler?: (error: Error, message: string) => void;
    verboseHandler?: (message: string | object) => void;
    verbose?: boolean;
    debugHandler?: (message: string | object) => void;
    debug?: boolean;
    curlirizeHandler?: (message: string) => void;
    curlirize?: boolean;
    createProgressHandler?: (type: ProgressIndicatorType, total?: number, message?: string) => string;
    updateProgressHandler?: (id: string, message: string) => void;
    stopProgressHandler?: (id: string, message: string, status?: string) => void;
}

interface ServiceListItem {
    /**
     * The identifier for the service - used to construct the subpath for the service
     */
    _id: string;
    /**
     * The user-facing name of the service
     */
    name: string;
    /**
     * The revision number of the service
     */
    _rev: string;
}
type AmServiceType = IdObjectSkeletonInterface & {
    name: string;
};
type AmServiceSkeleton = IdObjectSkeletonInterface & {
    _type: AmServiceType;
    [key: string]: any;
};
interface ServiceNextDescendent {
    [key: string]: any;
}
interface FullService extends AmServiceSkeleton {
    nextDescendents?: ServiceNextDescendent[];
}

type OAuth2ClientSkeleton = IdObjectSkeletonInterface & {
    overrideOAuth2ClientConfig?: {
        [k: string]: string | number | boolean | string[] | object | undefined;
    };
    advancedOAuth2ClientConfig?: {
        descriptions: {
            inherited: boolean;
            value: string[];
        };
        grantTypes?: Readable<string[]> | Writable<string[]>;
        isConsentImplied?: Readable<boolean> | Writable<boolean>;
        tokenEndpointAuthMethod?: Readable<string> | Writable<string>;
        responseTypes?: Readable<string[]> | Writable<string[]>;
        [k: string]: string | number | boolean | string[] | object | undefined;
    };
    signEncOAuth2ClientConfig?: {
        jwkSet?: Readable<string> | Writable<string>;
        publicKeyLocation?: Readable<string> | Writable<string>;
        [k: string]: string | number | boolean | string[] | object | undefined;
    };
    coreOpenIDClientConfig?: {
        [k: string]: string | number | boolean | string[] | object | undefined;
    };
    coreOAuth2ClientConfig?: {
        userpassword?: string;
        clientName?: Readable<string[]> | Writable<string[]>;
        clientType?: Readable<string> | Writable<string>;
        accessTokenLifetime?: Readable<number> | Writable<number>;
        scopes?: Readable<string[]> | Writable<string[]>;
        defaultScopes?: {
            value: string[];
            [k: string]: string | number | boolean | string[] | object | undefined;
        };
        [k: string]: string | number | boolean | string[] | object | undefined;
    };
    coreUmaClientConfig?: {
        [k: string]: string | number | boolean | string[] | object | undefined;
    };
    _type: AmServiceType;
};

type OAuth2TrustedJwtIssuerSkeleton = IdObjectSkeletonInterface & {
    allowedSubjects?: Readable<string[]> | Writable<string[]>;
    jwksCacheTimeout?: Readable<number> | Writable<number>;
    jwkSet?: Readable<string> | Writable<string>;
    consentedScopesClaim?: Readable<string> | Writable<string>;
    issuer: Readable<string> | Writable<string>;
    jwkStoreCacheMissCacheTime?: Readable<number> | Writable<number>;
    resourceOwnerIdentityClaim?: Readable<string> | Writable<string>;
    jwksUri?: Readable<string> | Writable<string>;
    _type: {
        _id: 'TrustedJwtIssuer';
        name: 'OAuth2 Trusted JWT Issuer';
        collection: true;
    };
};

type Admin = {
    generateRfc7523AuthZGrantArtefacts(clientId: string, iss: string, jwk?: JwkRsa, sub?: string, scope?: string[], options?: {
        save: boolean;
    }): Promise<{
        jwk: JwkRsa;
        jwks: JwksInterface;
        client: OAuth2ClientSkeleton;
        issuer: OAuth2TrustedJwtIssuerSkeleton;
    }>;
    executeRfc7523AuthZGrantFlow(clientId: string, iss: string, jwk: JwkRsa, sub: string, scope?: string[]): Promise<AccessTokenResponseType>;
    generateRfc7523ClientAuthNArtefacts(clientId: string, aud?: string, jwk?: JwkRsa, options?: {
        save: boolean;
    }): Promise<{
        jwk: JwkRsa;
        jwks: JwksInterface;
        jwt: any;
        client: OAuth2ClientSkeleton;
    }>;
    trainAA(apiKey: string, apiSecret: string, customUsernames?: string[], customUserAgents?: string[], customIPs?: string[], loginsPerUser?: number, service?: string): Promise<void>;
    /**
     * @deprecated Deprecated since v2.0.0. This function may be removed in future versions. Similar functionality has been added to the frodo-cli code base.
     * @group Deprecated
     */
    listOAuth2CustomClients(): Promise<string[]>;
    /**
     * @deprecated Deprecated since v2.0.0. This function may be removed in future versions. Similar functionality has been added to the frodo-cli code base.
     * @group Deprecated
     */
    listOAuth2AdminClients(): Promise<string[]>;
    /**
     * @deprecated Deprecated since v2.0.0. This function may be removed in future versions. Similar functionality has been added to the frodo-cli code base.
     * @group Deprecated
     */
    listNonOAuth2AdminStaticUserMappings(showProtected: boolean): Promise<string[]>;
    /**
     * @deprecated Deprecated since v2.0.0. This function may be removed in future versions. Similar functionality has been added to the frodo-cli code base.
     * @group Deprecated
     */
    addAutoIdStaticUserMapping(): Promise<void>;
    /**
     * @deprecated Deprecated since v2.0.0. This function may be removed in future versions. Similar functionality has been added to the frodo-cli code base.
     * @group Deprecated
     */
    grantOAuth2ClientAdminPrivileges(clientId: string): Promise<void>;
    /**
     * @deprecated Deprecated since v2.0.0. This function may be removed in future versions. Similar functionality has been added to the frodo-cli code base.
     * @group Deprecated
     */
    revokeOAuth2ClientAdminPrivileges(clientId: string): Promise<void>;
    /**
     * @deprecated Deprecated since v2.0.0. This function may be removed in future versions. Similar functionality has been added to the frodo-cli code base.
     * @group Deprecated
     */
    createOAuth2ClientWithAdminPrivileges(clientId: string, clientSecret: string): Promise<void>;
    /**
     * @deprecated Deprecated since v2.0.0. This function may be removed in future versions. Similar functionality has been added to the frodo-cli code base.
     * @group Deprecated
     */
    createLongLivedToken(clientId: string, clientSecret: string, scope: string, secret: string | boolean, lifetime: number): Promise<any>;
    /**
     * @deprecated Deprecated since v2.0.0. This function may be removed in future versions. Similar functionality has been added to the frodo-cli code base.
     * @group Deprecated
     */
    removeStaticUserMapping(subject: string): Promise<void>;
    /**
     * @deprecated Deprecated since v2.0.0. This function may be removed in future versions. Similar functionality has been added to the frodo-cli code base.
     * @group Deprecated
     */
    hideGenericExtensionAttributes(includeCustomized: boolean, dryRun: boolean): Promise<void>;
    /**
     * @deprecated Deprecated since v2.0.0. This function may be removed in future versions. Similar functionality has been added to the frodo-cli code base.
     * @group Deprecated
     */
    showGenericExtensionAttributes(includeCustomized: boolean, dryRun: boolean): Promise<void>;
    /**
     * @deprecated Deprecated since v2.0.0. This function may be removed in future versions. Similar functionality has been added to the frodo-cli code base.
     * @group Deprecated
     */
    repairOrgModel(excludeCustomized: boolean, extendPermissions: boolean, dryRun: boolean): Promise<void>;
};

type GatewayAgentType = 'IdentityGatewayAgent';
type JavaAgentType = 'J2EEAgent';
type WebAgentType = 'WebAgent';
type AgentType = GatewayAgentType | JavaAgentType | WebAgentType;
type AgentSkeleton = IdObjectSkeletonInterface & {
    _type: AmServiceType;
};

interface ExportMetaData {
    origin: string;
    originAmVersion: string;
    exportedBy: string;
    exportDate: string;
    exportTool: string;
    exportToolVersion: string;
}

type Agent = {
    /**
     * Create an empty agent export template
     * @returns {AgentExportInterface} an empty agent export template
     */
    createAgentExportTemplate(): AgentExportInterface;
    /**
     * Read all agents.
     * @returns {Promise<TreeSkeleton[]>} a promise that resolves to an array of agent objects
     */
    readAgents(): Promise<AgentSkeleton[]>;
    /**
     * Read agent
     * @param {string} agentId agent id/name
     * @returns {Promise<AgentSkeleton>} a promise that resolves to an agent object
     */
    readAgent(agentId: string): Promise<AgentSkeleton>;
    /**
     * Read agent by type and id
     * @param {string} agentType agent type (IdentityGatewayAgent, J2EEAgent, WebAgent)
     * @param {string} agentId agent id/name
     * @returns {Promise<AgentSkeleton>} a promise that resolves to an agent object
     */
    readAgentByTypeAndId(agentType: AgentType, agentId: string): Promise<AgentSkeleton>;
    /**
     * Read identity gateway agents
     * @returns {Promise<AgentSkeleton[]>} a promise that resolves to an array of IdentityGatewayAgent objects
     */
    readIdentityGatewayAgents(): Promise<AgentSkeleton[]>;
    /**
     * Read identity gateway agent
     * @param {string} gatewayId gateway id
     * @returns {Promise<AgentSkeleton>} a promise that resolves to an object containing an IdentityGatewayAgent object
     */
    readIdentityGatewayAgent(gatewayId: string): Promise<AgentSkeleton>;
    /**
     * Create identity gateway agent
     * @param {string} gatewayId gateway id
     * @param {AgentSkeleton} gatewayData IdentityGatewayAgent object
     * @returns {Promise<AgentSkeleton>} a promise that resolves to an object containing an IdentityGatewayAgent object
     */
    createIdentityGatewayAgent(gatewayId: string, gatewayData: AgentSkeleton): Promise<AgentSkeleton>;
    /**
     * Update or create identity gateway agent
     * @param {string} gatewayId gateway id
     * @param {AgentSkeleton} gatewayData IdentityGatewayAgent object
     * @returns {Promise<AgentSkeleton>} a promise that resolves to an object containing an IdentityGatewayAgent object
     */
    updateIdentityGatewayAgent(gatewayId: string, gatewayData: AgentSkeleton): Promise<AgentSkeleton>;
    /**
     * Read java agents
     * @returns {Promise<AgentSkeleton[]>} a promise that resolves to an array of J2EEAgent objects
     */
    readJavaAgents(): Promise<AgentSkeleton[]>;
    /**
     * Read java agent
     * @param {string} agentId java agent id
     * @returns {Promise<AgentSkeleton>} a promise that resolves to an object containing an J2EEAgent object
     */
    readJavaAgent(agentId: string): Promise<AgentSkeleton>;
    /**
     * Put java agent
     * @param {string} agentId java agent id
     * @param {AgentSkeleton} agentData java agent object
     * @returns {Promise<AgentSkeleton>} a promise that resolves to an object containing an java agent object
     */
    createJavaAgent(agentId: string, agentData: AgentSkeleton): Promise<AgentSkeleton>;
    /**
     * Put java agent
     * @param {string} agentId java agent id
     * @param {AgentSkeleton} agentData java agent object
     * @returns {Promise<AgentSkeleton>} a promise that resolves to an object containing an java agent object
     */
    updateJavaAgent(agentId: string, agentData: AgentSkeleton): Promise<AgentSkeleton>;
    /**
     * Read web agents
     * @returns {Promise<AgentSkeleton[]>} a promise that resolves to an array of WebAgent objects
     */
    readWebAgents(): Promise<AgentSkeleton[]>;
    /**
     * Read web agent
     * @param {string} agentId web agent id
     * @returns {Promise<AgentSkeleton>} a promise that resolves to an object containing an WebAgent object
     */
    readWebAgent(agentId: string): Promise<AgentSkeleton>;
    /**
     * Create web agent
     * @param {string} agentId web agent id
     * @param {AgentSkeleton} agentData WebAgent object
     * @returns {Promise<AgentSkeleton>} a promise that resolves to an object containing an WebAgent object
     */
    createWebAgent(agentId: string, agentData: AgentSkeleton): Promise<AgentSkeleton>;
    /**
     * Update or create web agent
     * @param {string} agentId web agent id
     * @param {AgentSkeleton} agentData WebAgent object
     * @returns {Promise<AgentSkeleton>} a promise that resolves to an object containing an WebAgent object
     */
    updateWebAgent(agentId: string, agentData: AgentSkeleton): Promise<AgentSkeleton>;
    /**
     * Export all agents. The response can be saved to file as is.
     * @returns {Promise<AgentExportInterface>} Promise resolving to an AgentExportInterface object.
     */
    exportAgents(): Promise<AgentExportInterface>;
    /**
     * Export all identity gateway agents. The response can be saved to file as is.
     * @returns {Promise<AgentExportInterface} Promise resolving to an AgentExportInterface object.
     */
    exportIdentityGatewayAgents(): Promise<AgentExportInterface>;
    /**
     * Export all java agents. The response can be saved to file as is.
     * @returns {Promise<AgentExportInterface} Promise resolving to an AgentExportInterface object.
     */
    exportJavaAgents(): Promise<AgentExportInterface>;
    /**
     * Export all web agents. The response can be saved to file as is.
     * @returns {Promise<AgentExportInterface} Promise resolving to an AgentExportInterface object.
     */
    exportWebAgents(): Promise<AgentExportInterface>;
    /**
     * Export agent. The response can be saved to file as is.
     * @param agentId agent id/name
     * @returns {Promise<AgentExportInterface} Promise resolving to an AgentExportInterface object.
     */
    exportAgent(agentId: string): Promise<AgentExportInterface>;
    /**
     * Export identity gateway agent. The response can be saved to file as is.
     * @param agentId agent id/name
     * @returns {Promise<AgentExportInterface} Promise resolving to an AgentExportInterface object.
     */
    exportIdentityGatewayAgent(agentId: string): Promise<AgentExportInterface>;
    /**
     * Export java agent. The response can be saved to file as is.
     * @param agentId agent id/name
     * @returns {Promise<AgentExportInterface} Promise resolving to an AgentExportInterface object.
     */
    exportJavaAgent(agentId: string): Promise<AgentExportInterface>;
    /**
     * Export web agent. The response can be saved to file as is.
     * @param agentId agent id/name
     * @returns {Promise<AgentExportInterface} Promise resolving to an AgentExportInterface object.
     */
    exportWebAgent(agentId: string): Promise<AgentExportInterface>;
    /**
     * Import agents. The import data is usually read from an agent export file.
     * @param {AgentExportInterface} importData agent import data.
     */
    importAgents(importData: AgentExportInterface): Promise<void>;
    /**
     * Import identity gateway agents. The import data is usually read from an agent export file.
     * @param {AgentExportInterface} importData agent import data.
     */
    importIdentityGatewayAgents(importData: AgentExportInterface): Promise<void>;
    /**
     * Import java agents. The import data is usually read from an agent export file.
     * @param {AgentExportInterface} importData agent import data.
     */
    importJavaAgents(importData: AgentExportInterface): Promise<void>;
    /**
     * Import web agents. The import data is usually read from an agent export file.
     * @param {AgentExportInterface} importData agent import data.
     */
    importWebAgents(importData: AgentExportInterface): Promise<void>;
    /**
     * Import agent. The import data is usually read from an agent export file.
     * @param {string} agentId agent id/name
     * @param {AgentExportInterface} importData agent import data.
     * @returns {Promise} Promise resolving to an agent object.
     */
    importAgent(agentId: string, importData: AgentExportInterface): Promise<any>;
    /**
     * Import identity gateway agent. The import data is usually read from an agent export file.
     * @param {string} agentId agent id/name
     * @param {AgentExportInterface} importData agent import data.
     * @returns {Promise} Promise resolving to an agent object.
     */
    importIdentityGatewayAgent(agentId: string, importData: AgentExportInterface): Promise<any>;
    /**
     * Import java agent. The import data is usually read from an agent export file.
     * @param {string} agentId agent id/name
     * @param {AgentExportInterface} importData agent import data.
     * @returns {Promise} Promise resolving to an agent object.
     */
    importJavaAgent(agentId: string, importData: AgentExportInterface): Promise<any>;
    /**
     * Import java agent. The import data is usually read from an agent export file.
     * @param {string} agentId agent id/name
     * @param {AgentExportInterface} importData agent import data.
     * @returns {Promise} Promise resolving to an agent object.
     */
    importWebAgent(agentId: string, importData: AgentExportInterface): Promise<any>;
    /**
     * Delete all agents
     */
    deleteAgents(): Promise<void>;
    /**
     * Delete agent
     * @param agentId agent id/name
     */
    deleteAgent(agentId: string): Promise<void>;
    /**
     * Delete all identity gateway agents
     */
    deleteIdentityGatewayAgents(): Promise<void>;
    /**
     * Delete identity gateway agent
     * @param agentId agent id/name
     */
    deleteIdentityGatewayAgent(agentId: string): Promise<void>;
    /**
     * Delete all java agents
     */
    deleteJavaAgents(): Promise<void>;
    /**
     * Delete java agent
     * @param agentId agent id/name
     */
    deleteJavaAgent(agentId: string): Promise<void>;
    /**
     * Delete all web agents
     */
    deleteWebAgents(): Promise<void>;
    /**
     * Delete web agent
     * @param agentId agent id/name
     */
    deleteWebAgent(agentId: string): Promise<void>;
    /**
     * Get all agents.
     * @returns {Promise<TreeSkeleton[]>} a promise that resolves to an array of agent objects
     * @deprecated since v2.0.0 use {@link Agent.readAgents | readAgents} instead
     * ```javascript
     * readAgents(): Promise<AgentSkeleton[]>
     * ```
     * @group Deprecated
     */
    getAgents(): Promise<AgentSkeleton[]>;
    /**
     * Get agent
     * @param {string} agentId agent id/name
     * @returns {Promise<AgentSkeleton>} a promise that resolves to an agent object
     * @deprecated since v2.0.0 use {@link Agent.readAgent | readAgent} instead
     * ```javascript
     * readAgent(agentId: string): Promise<AgentSkeleton>
     * ```
     * @group Deprecated
     */
    getAgent(agentId: string): Promise<AgentSkeleton>;
    /**
     * Get agent by type and id
     * @param {string} agentType agent type (IdentityGatewayAgent, J2EEAgent, WebAgent)
     * @param {string} agentId agent id/name
     * @returns {Promise<AgentSkeleton>} a promise that resolves to an agent object
     * @deprecated since v2.0.0 use {@link Agent.readAgentByTypeAndId | readAgentByTypeAndId} instead
     * ```javascript
     * readAgentByTypeAndId(agentType: AgentType, agentId: string): Promise<AgentSkeleton>
     * ```
     * @group Deprecated
     */
    getAgentByTypeAndId(agentType: AgentType, agentId: string): Promise<AgentSkeleton>;
    /**
     * Get identity gateway agents
     * @returns {Promise<AgentSkeleton[]>} a promise that resolves to an array of IdentityGatewayAgent objects
     * @deprecated since v2.0.0 use {@link Agent.readIdentityGatewayAgents | readIdentityGatewayAgents} instead
     * ```javascript
     * readIdentityGatewayAgents(): Promise<AgentSkeleton[]>
     * ```
     * @group Deprecated
     */
    getIdentityGatewayAgents(): Promise<AgentSkeleton[]>;
    /**
     * Get identity gateway agent
     * @param {string} gatewayId gateway id
     * @returns {Promise<AgentSkeleton>} a promise that resolves to an object containing an IdentityGatewayAgent object
     * @deprecated since v2.0.0 use {@link Agent.readIdentityGatewayAgent | readIdentityGatewayAgent} instead
     * ```javascript
     * readIdentityGatewayAgent(gatewayId: string): Promise<AgentSkeleton>
     * ```
     * @group Deprecated
     */
    getIdentityGatewayAgent(gatewayId: string): Promise<AgentSkeleton>;
    /**
     * Update or create identity gateway agent
     * @param {string} gatewayId gateway id
     * @param {AgentSkeleton} gatewayData IdentityGatewayAgent object
     * @returns {Promise<AgentSkeleton>} a promise that resolves to an object containing an IdentityGatewayAgent object
     * @deprecated since v2.0.0 use {@link Agent.updateIdentityGatewayAgent | updateIdentityGatewayAgent} or {@link Agent.createIdentityGatewayAgent | createIdentityGatewayAgent} instead
     * ```javascript
     * updateIdentityGatewayAgent(gatewayId: string, gatewayData: AgentSkeleton): Promise<AgentSkeleton>
     * createIdentityGatewayAgent(gatewayId: string, gatewayData: AgentSkeleton): Promise<AgentSkeleton>
     * ```
     * @group Deprecated
     */
    putIdentityGatewayAgent(gatewayId: string, gatewayData: AgentSkeleton): Promise<AgentSkeleton>;
    /**
     * Get java agents
     * @returns {romise<AgentSkeleton[]>} a promise that resolves to an array of J2EEAgent objects
     * @deprecated since v2.0.0 use {@link Agent.readJavaAgents | readJavaAgents} instead
     * ```javascript
     * readJavaAgents(): Promise<AgentSkeleton[]>
     * ```
     * @group Deprecated
     */
    getJavaAgents(): Promise<AgentSkeleton[]>;
    /**
     * Get java agent
     * @param {string} agentId java agent id
     * @returns {Promise<AgentSkeleton>} a promise that resolves to an object containing an J2EEAgent object
     * @deprecated since v2.0.0 use {@link Agent.readJavaAgent | readJavaAgent} instead
     * ```javascript
     * readJavaAgent(agentId: string): Promise<AgentSkeleton>
     * ```
     * @group Deprecated
     */
    getJavaAgent(agentId: string): Promise<AgentSkeleton>;
    /**
     * Update or create java agent
     * @param {string} agentId java agent id
     * @param {AgentSkeleton} agentData java agent object
     * @returns {Promise<AgentSkeleton>} a promise that resolves to an object containing an java agent object
     * @deprecated since v2.0.0 use {@link Agent.updateJavaAgent | updateJavaAgent} or {@link Agent.createJavaAgent | createJavaAgent} instead
     * ```javascript
     * updateJavaAgent(agentId: string, agentData: AgentSkeleton): Promise<AgentSkeleton>
     * createJavaAgent(agentId: string, agentData: AgentSkeleton): Promise<AgentSkeleton>
     * ```
     * @group Deprecated
     */
    putJavaAgent(agentId: string, agentData: AgentSkeleton): Promise<AgentSkeleton>;
    /**
     * Get web agents
     * @returns {Promise<AgentSkeleton[]>} a promise that resolves to an array of WebAgent objects
     * @deprecated since v2.0.0 use {@link Agent.readWebAgents | readWebAgents} instead
     * ```javascript
     * readWebAgents(): Promise<AgentSkeleton[]>
     * ```
     * @group Deprecated
     */
    getWebAgents(): Promise<AgentSkeleton[]>;
    /**
     * Get web agent
     * @param {string} agentId web agent id
     * @returns {Promise<AgentSkeleton>} a promise that resolves to an object containing an WebAgent object
     * @deprecated since v2.0.0 use {@link Agent.readWebAgent | readWebAgent} instead
     * ```javascript
     * readWebAgent(agentId: string): Promise<AgentSkeleton>
     * ```
     * @group Deprecated
     */
    getWebAgent(agentId: string): Promise<AgentSkeleton>;
    /**
     * Update or create web agent
     * @param {string} agentId web agent id
     * @param {AgentSkeleton} agentData WebAgent object
     * @returns {Promise<AgentSkeleton>} a promise that resolves to an object containing an WebAgent object
     * @deprecated since v2.0.0 use {@link Agent.updateWebAgent | updateWebAgent} or {@link Agent.createWebAgent | createWebAgent} instead
     * ```javascript
     * updateWebAgent(agentId: string, agentData: AgentSkeleton): Promise<AgentSkeleton>
     * createWebAgent(agentId: string, agentData: AgentSkeleton): Promise<AgentSkeleton>
     * ```
     * @group Deprecated
     */
    putWebAgent(agentId: string, agentData: AgentSkeleton): Promise<AgentSkeleton>;
};
interface AgentExportInterface {
    meta?: ExportMetaData;
    agents: Record<string, AgentSkeleton>;
}

type CircleOfTrustSkeleton = IdObjectSkeletonInterface & {
    status?: string;
    trustedProviders?: string[];
    _type?: AmServiceType;
};

type Saml2ProiderLocation = 'hosted' | 'remote';
type Saml2ProviderStub = IdObjectSkeletonInterface & {
    entityId: string;
    location: Saml2ProiderLocation;
    roles: string[];
};
type Saml2ProviderSkeleton = IdObjectSkeletonInterface & {
    entityId: string;
    entityLocation: Saml2ProiderLocation;
    serviceProvider: unknown;
    identityProvider: {
        assertionProcessing?: {
            attributeMapper?: {
                attributeMapperScript?: string;
            };
        };
        advanced?: {
            idpAdapter?: {
                idpAdapterScript?: string;
            };
        };
    };
    attributeQueryProvider: unknown;
    xacmlPolicyEnforcementPoint: unknown;
};

type ScriptLanguage = 'GROOVY' | 'JAVASCRIPT';
type ScriptContext = 'OAUTH2_ACCESS_TOKEN_MODIFICATION' | 'AUTHENTICATION_CLIENT_SIDE' | 'AUTHENTICATION_TREE_DECISION_NODE' | 'AUTHENTICATION_SERVER_SIDE' | 'SOCIAL_IDP_PROFILE_TRANSFORMATION' | 'OAUTH2_VALIDATE_SCOPE' | 'CONFIG_PROVIDER_NODE' | 'OAUTH2_AUTHORIZE_ENDPOINT_DATA_PROVIDER' | 'OAUTH2_EVALUATE_SCOPE' | 'POLICY_CONDITION' | 'OIDC_CLAIMS' | 'SAML2_IDP_ADAPTER' | 'SAML2_IDP_ATTRIBUTE_MAPPER' | 'OAUTH2_MAY_ACT';
type ScriptSkeleton = IdObjectSkeletonInterface & {
    name: string;
    description: string;
    default: boolean;
    script: string | string[];
    language: ScriptLanguage;
    context: ScriptContext;
    createdBy: string;
    creationDate: number;
    lastModifiedBy: string;
    lastModifiedDate: number;
};

type Mapping = {
    /**
     * Create an empty mapping export template
     * @returns {MappingExportInterface} an empty mapping export template
     */
    createMappingExportTemplate(): MappingExportInterface;
    /**
     * Read mappings from sync.json (legacy)
     * @returns {Promise<MappingSkeleton[]>} a promise that resolves to an array of mapping objects
     */
    readSyncMappings(): Promise<MappingSkeleton[]>;
    /**
     * Read mappings
     * @param {string} connectorId limit mappings to connector
     * @param {string} moType limit mappings to managed object type
     * @returns {Promise<MappingSkeleton[]>} a promise that resolves to an array of mapping objects
     */
    readMappings(connectorId?: string, moType?: string): Promise<MappingSkeleton[]>;
    /**
     * Read mapping
     * @param {string} mappingId id of the mapping (new: 'mapping/\<name>', legacy: 'sync/\<name>')
     * @returns {Promise<MappingSkeleton>} a promise that resolves an mapping object
     */
    readMapping(mappingId: string): Promise<MappingSkeleton>;
    /**
     * Create mapping
     * @param {string} mappingId id of the mapping (new: 'mapping/\<name>', legacy: 'sync/\<name>')
     * @param {MappingSkeleton} mappingData mapping object
     * @returns {Promise<MappingSkeleton>} a promise that resolves to an mapping object
     */
    createMapping(mappingId: string, mappingData: MappingSkeleton): Promise<MappingSkeleton>;
    /**
     * Update or create mapping
     * @param {string} mappingId id of the mapping (new: 'mapping/\<name>', legacy: 'sync/\<name>')
     * @param {MappingSkeleton} mappingData mapping object
     * @returns {Promise<MappingSkeleton>} a promise that resolves to an mapping object
     */
    updateMapping(mappingId: string, mappingData: MappingSkeleton): Promise<MappingSkeleton>;
    /**
     * Update or create mappings in sync.json (legacy)
     * @param {MappingSkeleton} mappingData mapping object
     * @returns {Promise<MappingSkeleton>} a promise that resolves to an mapping object
     */
    updateSyncMappings(mappings: MappingSkeleton[]): Promise<MappingSkeleton[]>;
    /**
     * Delete all mappings
     * @param {string} connectorId limit mappings to connector
     * @param {string} moType limit mappings to managed object type
     * @returns {Promise<MappingSkeleton[]>} a promise that resolves to an array of mapping objects
     */
    deleteMappings(connectorId?: string, moType?: string): Promise<MappingSkeleton[]>;
    /**
     * Delete mapping
     * @param {string} mappingId id of the mapping (new: 'mapping/\<name>', legacy: 'sync/\<name>')
     * @returns {Promise<MappingSkeleton>} a promise that resolves an mapping object
     */
    deleteMapping(mappingId: string): Promise<MappingSkeleton>;
    /**
     * Export mapping
     * @param {string} mappingId id of the mapping (new: 'mapping/\<name>', legacy: 'sync/\<name>')
     * @returns {Promise<MappingExportInterface>} a promise that resolves to a MappingExportInterface object
     */
    exportMapping(mappingId: string): Promise<MappingExportInterface>;
    /**
     * Export all mappings
     * @returns {Promise<MappingExportInterface>} a promise that resolves to a MappingExportInterface object
     */
    exportMappings(): Promise<MappingExportInterface>;
    /**
     * Import mapping
     * @param {string} mappingId id of the mapping (new: 'mapping/\<name>', legacy: 'sync/\<name>')
     * @param {MappingExportInterface} importData import data
     * @param {MappingImportOptions} options import options
     * @returns {Promise<MappingSkeleton>} a promise resolving to a MappingSkeleton object
     */
    importMapping(mappingId: string, importData: MappingExportInterface, options?: MappingImportOptions): Promise<MappingSkeleton>;
    /**
     * Import first mapping
     * @param {MappingExportInterface} importData import data
     * @param {MappingImportOptions} options import options
     * @returns {Promise<MappingSkeleton>} a promise resolving to a MappingSkeleton object
     */
    importFirstMapping(importData: MappingExportInterface, options?: MappingImportOptions): Promise<MappingSkeleton>;
    /**
     * Import all mappings
     * @param {MappingExportInterface} importData import data
     * @param {MappingImportOptions} options import options
     * @returns {Promise<MappingSkeleton[]>} a promise resolving to an array of MappingSkeleton objects
     */
    importMappings(importData: MappingExportInterface, options?: MappingImportOptions): Promise<MappingSkeleton[]>;
};
type MappingPolicy = {
    action: 'CREATE' | 'DELETE' | 'EXCEPTION' | 'IGNORE' | 'UPDATE';
    situation: 'ABSENT' | 'ALL_GONE' | 'AMBIGUOUS' | 'CONFIRMED' | 'FOUND' | 'FOUND_ALREADY_LINKED' | 'LINK_ONLY' | 'MISSING' | 'SOURCE_IGNORED' | 'SOURCE_MISSING' | 'TARGET_IGNORED' | 'UNASSIGNED' | 'UNQUALIFIED';
};
type MappingProperty = {
    source?: string;
    target: string;
    transform?: {
        globals: any;
        source: string;
        type: string;
    };
};
type MappingSkeleton = IdObjectSkeletonInterface & {
    name: string;
    displayName?: string;
    linkQualifiers?: string[];
    consentRequired?: boolean;
    policies?: MappingPolicy[];
    properties?: MappingProperty[];
    source?: string;
    target?: string;
};
interface MappingExportInterface {
    meta?: ExportMetaData;
    mapping: Record<string, MappingSkeleton>;
}
/**
 * Mapping import options
 */
interface MappingImportOptions {
    /**
     * Include any dependencies.
     */
    deps: boolean;
}

type Connector = {
    /**
     * Connector type key used to build the IDM id: '<type>/<id>'
     */
    CONNECTOR_TYPE: string;
    /**
     * Create an empty connector export template
     * @returns {ConnectorExportInterface} an empty connector export template
     */
    createConnectorExportTemplate(): ConnectorExportInterface;
    /**
     * Get all connectors
     * @returns {Promise<ConnectorSkeleton[]>} a promise that resolves to an array of connector objects
     */
    readConnectors(): Promise<ConnectorSkeleton[]>;
    /**
     * Get connector
     * @param {string} connectorId id/name of the connector without the type prefix
     * @returns {Promise<ConnectorSkeleton>} a promise that resolves an connector object
     */
    readConnector(connectorId: string): Promise<ConnectorSkeleton>;
    /**
     * Create connector
     * @param {string} connectorId id/name of the connector without the type prefix
     * @param {ConnectorSkeleton} connectorData connector object
     * @returns {Promise<ConnectorSkeleton>} a promise that resolves to an connector object
     */
    createConnector(connectorId: string, connectorData: ConnectorSkeleton): Promise<ConnectorSkeleton>;
    /**
     * Update or create connector
     * @param {string} connectorId id/name of the connector without the type prefix
     * @param {ConnectorSkeleton} connectorData connector object
     * @returns {Promise<ConnectorSkeleton>} a promise that resolves to an connector object
     */
    updateConnector(connectorId: string, connectorData: ConnectorSkeleton): Promise<ConnectorSkeleton>;
    /**
     * Delete all connectors
     * @returns {Promise<ConnectorSkeleton[]>} a promise that resolves to an array of connector objects
     */
    deleteConnectors(): Promise<ConnectorSkeleton[]>;
    /**
     * Delete connector
     * @param {string} connectorId id/name of the connector without the type prefix
     * @returns {Promise<ConnectorSkeleton>} a promise that resolves an connector object
     */
    deleteConnector(connectorId: string): Promise<ConnectorSkeleton>;
    /**
     * Export connector
     * @param {string} connectorId id/name of the connector without the type prefix
     * @param {ConnectorExportOptions} options export options
     * @returns {Promise<ConnectorExportInterface>} a promise that resolves to a ConnectorExportInterface object
     */
    exportConnector(connectorId: string, options?: ConnectorExportOptions): Promise<ConnectorExportInterface>;
    /**
     * Export all connectors
     * @returns {Promise<ConnectorExportInterface>} a promise that resolves to a ConnectorExportInterface object
     */
    exportConnectors(): Promise<ConnectorExportInterface>;
    /**
     * Import connector
     * @param {string} connectorId id/name of the connector without the type prefix
     * @param {ConnectorExportInterface} importData import data
     * @param {ConnectorImportOptions} options import options
     * @returns {Promise<ConnectorSkeleton>} a promise resolving to a ConnectorSkeleton object
     */
    importConnector(connectorId: string, importData: ConnectorExportInterface, options?: ConnectorImportOptions): Promise<ConnectorSkeleton>;
    /**
     * Import first connector
     * @param {ConnectorExportInterface} importData import data
     * @param {ConnectorImportOptions} options import options
     * @returns {Promise<ConnectorSkeleton>} a promise resolving to a ConnectorSkeleton object
     */
    importFirstConnector(importData: ConnectorExportInterface, options?: ConnectorImportOptions): Promise<ConnectorSkeleton>;
    /**
     * Import all connectors
     * @param {ConnectorExportInterface} importData import data
     * @param {ConnectorImportOptions} options import options
     * @returns {Promise<ConnectorSkeleton[]>} a promise resolving to an array of ConnectorSkeleton objects
     */
    importConnectors(importData: ConnectorExportInterface, options?: ConnectorImportOptions): Promise<ConnectorSkeleton[]>;
};
type ObjectPropertyFlag = 'NOT_CREATABLE' | 'NOT_READABLE' | 'NOT_RETURNED_BY_DEFAULT' | 'NOT_UPDATEABLE';
type ObjectPropertyType = 'array' | 'boolean' | 'string';
type ObjectPropertyNativeType = 'array' | 'boolean' | 'string' | 'JAVA_TYPE_BIGDECIMAL' | 'JAVA_TYPE_BIGINTEGER' | 'JAVA_TYPE_BYTE' | 'JAVA_TYPE_BYTE_ARRAY' | 'JAVA_TYPE_CHAR' | 'JAVA_TYPE_CHARACTER' | 'JAVA_TYPE_DATE' | 'JAVA_TYPE_DOUBLE' | 'JAVA_TYPE_FILE' | 'JAVA_TYPE_FLOAT' | 'JAVA_TYPE_GUARDEDBYTEARRAY' | 'JAVA_TYPE_GUARDEDSTRING' | 'JAVA_TYPE_INT' | 'JAVA_TYPE_INTEGER' | 'JAVA_TYPE_LONG' | 'JAVA_TYPE_OBJECT' | 'JAVA_TYPE_PRIMITIVE_BOOLEAN' | 'JAVA_TYPE_PRIMITIVE_BYTE' | 'JAVA_TYPE_PRIMITIVE_DOUBLE' | 'JAVA_TYPE_PRIMITIVE_FLOAT' | 'JAVA_TYPE_PRIMITIVE_LONG' | 'JAVA_TYPE_STRING';
type ObjectPropertySkeleton = {
    flags?: ObjectPropertyFlag[];
    nativeName: string;
    nativeType: ObjectPropertyNativeType;
    type: ObjectPropertyType;
    runAsUser?: boolean;
    required?: boolean;
    items?: {
        nativeType: ObjectPropertyNativeType;
        type: ObjectPropertyType;
    };
};
type ObjectTypeSkeleton = {
    $schema: string;
    id: string;
    nativeType: string;
    properties: Record<string, ObjectPropertySkeleton>;
    type: 'object';
};
type ConnectorSkeleton = IdObjectSkeletonInterface & {
    configurationProperties: any;
    connectorRef: {
        bundleName: string;
        bundleVersion: string;
        connectorHostRef: string;
        connectorName: string;
        displayName: string;
        systemType: 'provisioner.openicf';
    };
    enabled: boolean;
    objectTypes: Record<string, ObjectTypeSkeleton>;
};
/**
 * Connector export options
 */
interface ConnectorExportOptions {
    /**
     * Use string arrays to store multi-line text in scripts.
     */
    useStringArrays: boolean;
    /**
     * Include any dependencies (mappings).
     */
    deps: boolean;
}
/**
 * Connector import options
 */
interface ConnectorImportOptions {
    /**
     * Include any dependencies (mappings).
     */
    deps: boolean;
}
interface ConnectorExportInterface {
    meta?: ExportMetaData;
    connector: Record<string, ConnectorSkeleton>;
    mapping?: Record<string, MappingSkeleton>;
}

type Application = {
    /**
     * Create an empty application export template
     * @returns {ApplicationExportInterface} an empty application export template
     */
    createApplicationExportTemplate(): ApplicationExportInterface;
    /**
     * Get application managed object type
     * @returns {String} application managed object type in this realm
     */
    getRealmManagedApplication(): string;
    /**
     * Create application
     * @param {string} applicationId application id/name
     * @param {ApplicationSkeleton} applicationData application data
     * @returns {Promise<ApplicationSkeleton>} a promise that resolves to an application object
     */
    createApplication(applicationId: string, applicationData: ApplicationSkeleton): Promise<ApplicationSkeleton>;
    /**
     * Read application
     * @param {string} applicationId application uuid
     * @returns {Promise<ApplicationSkeleton>} a promise that resolves to an application object
     */
    readApplication(applicationId: string): Promise<ApplicationSkeleton>;
    /**
     * Read application by name
     * @param {string} applicationName application name
     * @returns {Promise<ApplicationSkeleton>} a promise that resolves to an application object
     */
    readApplicationByName(applicationName: string): Promise<ApplicationSkeleton>;
    /**
     * Read all applications. Results are sorted aphabetically.
     * @returns {Promise<ApplicationSkeleton[]>} a promise that resolves to an array of application objects
     */
    readApplications(): Promise<ApplicationSkeleton[]>;
    /**
     * Update application
     * @param {string} applicationId application uuid
     * @param {ApplicationSkeleton} applicationData application data
     * @returns {Promise<ApplicationSkeleton>} a promise that resolves to an application object
     */
    updateApplication(applicationId: string, applicationData: ApplicationSkeleton): Promise<ApplicationSkeleton>;
    /**
     * Delete application
     * @param {string} applicationId application uuid
     * @param {boolean} deep deep delete (remove dependencies)
     * @returns {Promise<ApplicationSkeleton>} a promise that resolves to an application object
     */
    deleteApplication(applicationId: string, deep?: boolean): Promise<ApplicationSkeleton>;
    /**
     * Delete application by name
     * @param {string} applicationName application name
     * @param {boolean} deep deep delete (remove dependencies)
     * @returns {Promise<ApplicationSkeleton>} a promise that resolves to an application object
     */
    deleteApplicationByName(applicationName: string, deep?: boolean): Promise<ApplicationSkeleton>;
    /**
     * Delete all applications
     * @param {boolean} deep deep delete (remove dependencies)
     * @returns {Promise<ApplicationSkeleton[]>} a promise that resolves to an array of application objects
     */
    deleteApplications(deep?: boolean): Promise<ApplicationSkeleton[]>;
    /**
     * Query applications
     * @param filter CREST search filter
     * @param fields array of fields to return
     */
    queryApplications(filter: string, fields?: string[]): Promise<ApplicationSkeleton[]>;
    /**
     * Export application. The response can be saved to file as is.
     * @param {string} applicationId application uuid
     * @param {ApplicationExportOptions} options export options
     * @returns {Promise<ApplicationExportInterface} Promise resolving to an ApplicationExportInterface object.
     */
    exportApplication(applicationId: string, options: ApplicationExportOptions): Promise<ApplicationExportInterface>;
    /**
     * Export application by name. The response can be saved to file as is.
     * @param {string} applicationName application name
     * @param {ApplicationExportOptions} options export options
     * @returns {Promise<ApplicationExportInterface} Promise resolving to an ApplicationExportInterface object.
     */
    exportApplicationByName(applicationName: string, options: ApplicationExportOptions): Promise<ApplicationExportInterface>;
    /**
     * Export all applications. The response can be saved to file as is.
     * @returns {Promise<ApplicationExportInterface>} Promise resolving to an ApplicationExportInterface object.
     */
    exportApplications(options?: ApplicationExportOptions): Promise<ApplicationExportInterface>;
    /**
     * Import application. The import data is usually read from an application export file.
     * @param {string} applicationId application uuid
     * @param {ApplicationExportInterface} importData application import data.
     * @returns {Promise<ApplicationSkeleton>} Promise resolving to an application object.
     */
    importApplication(applicationId: string, importData: ApplicationExportInterface, options: ApplicationImportOptions): Promise<ApplicationSkeleton>;
    /**
     * Import application by name. The import data is usually read from an application export file.
     * @param {string} applicationName application name
     * @param {ApplicationExportInterface} importData application import data.
     * @returns {Promise<ApplicationSkeleton>} Promise resolving to an application object.
     */
    importApplicationByName(applicationName: string, importData: ApplicationExportInterface, options: ApplicationImportOptions): Promise<ApplicationSkeleton>;
    /**
     * Import first application. The import data is usually read from an application export file.
     * @param {ApplicationExportInterface} importData application import data.
     */
    importFirstApplication(importData: ApplicationExportInterface, options: ApplicationImportOptions): Promise<ApplicationSkeleton[]>;
    /**
     * Import applications. The import data is usually read from an application export file.
     * @param {ApplicationExportInterface} importData application import data.
     */
    importApplications(importData: ApplicationExportInterface, options: ApplicationImportOptions): Promise<ApplicationSkeleton[]>;
};
type ApplicationSkeleton = IdObjectSkeletonInterface & {
    authoritative: boolean;
    connectorId: string;
    description: string;
    icon: string;
    mappingNames: string[];
    members: any;
    name: string;
    owners: any;
    roles: any;
    ssoEntities: {
        idpLocation: string;
        idpPrivateId: string;
        spLocation: string;
        spPrivate: string;
    };
    templateName: string;
    templateVersion: string;
    uiConfig: object;
    url: string;
};
/**
 * Export format for applications
 */
interface ApplicationExportInterface {
    /**
     * Metadata
     */
    meta?: ExportMetaData;
    /**
     * Managed applications
     */
    managedApplication: Record<string, ApplicationSkeleton>;
    /**
     * Scripts
     */
    script?: Record<string, ScriptSkeleton>;
    /**
     * OAuth2 clients
     */
    application?: Record<string, OAuth2ClientSkeleton>;
    /**
     * Saml providers, circles of trust, and metadata
     */
    saml?: {
        hosted?: Record<string, Saml2ProviderSkeleton>;
        remote?: Record<string, Saml2ProviderSkeleton>;
        metadata?: Record<string, string[]>;
        cot?: Record<string, CircleOfTrustSkeleton>;
    };
    /**
     * connectors
     */
    connector?: Record<string, ConnectorSkeleton>;
    /**
     * mappings
     */
    mapping?: Record<string, MappingSkeleton>;
}
/**
 * Application export options
 */
type ApplicationExportOptions = {
    /**
     * Include any dependencies (scripts, oauth2 clients, saml providers, circles of trust, etc).
     */
    deps: boolean;
    /**
     * Use string arrays to store multi-line text in scripts.
     */
    useStringArrays: boolean;
};
/**
 * Application export options
 */
type ApplicationImportOptions = {
    /**
     * Import any dependencies (scripts).
     */
    deps: boolean;
};

type AuthenticationSettingsSkeleton = IdObjectSkeletonInterface & {
    _id: '';
    _type: {
        _id: 'EMPTY';
        name: 'Core';
        collection: false;
    };
};

type AuthenticationSettings = {
    /**
     * Read authentication settings
     * @returns {Promise<AuthenticationSettingsSkeleton>} a promise that resolves an authentication settings object
     */
    readAuthenticationSettings(): Promise<AuthenticationSettingsSkeleton>;
    /**
     * Update authentication settings
     * @param {AuthenticationSettingsSkeleton} settings authentication settings data
     * @returns {Promise<AuthenticationSettingsSkeleton>} a promise that resolves an authentication settings object
     */
    updateAuthenticationSettings(settings: AuthenticationSettingsSkeleton): Promise<AuthenticationSettingsSkeleton>;
    /**
     * Export authentication settings
     * @returns {Promise<AuthenticationSettingsExportInterface>} a promise that resolves to an AuthenticationSettingsExportInterface object
     */
    exportAuthenticationSettings(): Promise<AuthenticationSettingsExportInterface>;
    /**
     * Import authentication settings
     * @param {AuthenticationSettingsExportInterface} importData import data
     */
    importAuthenticationSettings(importData: AuthenticationSettingsExportInterface): Promise<AuthenticationSettingsSkeleton>;
};
interface AuthenticationSettingsExportInterface {
    meta?: ExportMetaData;
    authentication: AuthenticationSettingsSkeleton;
}

type CirclesOfTrust = {
    /**
     * Create an empty agent export template
     * @returns {CirclesOfTrustExportInterface} an empty agent export template
     */
    createCirclesOfTrustExportTemplate(): CirclesOfTrustExportInterface;
    /**
     * Read all circles of trust
     * @param {string[]} entityProviders filter by entity providers
     */
    readCirclesOfTrust(entityProviders?: string[]): Promise<CircleOfTrustSkeleton[]>;
    /**
     * Read circle of trust
     * @param {string} cotId circle of trust id/name
     */
    readCircleOfTrust(cotId: string): Promise<CircleOfTrustSkeleton>;
    /**
     * Create circle of trust
     * @param {string} cotId circle of trust id/name
     * @param {CircleOfTrustSkeleton} cotData circle of trust data
     */
    createCircleOfTrust(cotId?: string, cotData?: CircleOfTrustSkeleton): Promise<CircleOfTrustSkeleton>;
    /**
     * Update circle of trust
     * @param {string} cotId circle of trust id/name
     * @param cotData circle of trust data
     */
    updateCircleOfTrust(cotId: string, cotData: CircleOfTrustSkeleton): Promise<CircleOfTrustSkeleton>;
    /**
     * Delete circle of trust
     * @param {string} cotId circle of trust id/name
     */
    deleteCircleOfTrust(cotId: string): Promise<CircleOfTrustSkeleton>;
    /**
     * Delete circles of trust
     * @param {string[]} entityProviders filter by entity providers
     */
    deleteCirclesOfTrust(entityProviders?: string[]): Promise<CircleOfTrustSkeleton[]>;
    /**
     * Export circle of trust
     * @param {string} cotId circle of trust id/name
     */
    exportCircleOfTrust(cotId: string): Promise<CirclesOfTrustExportInterface>;
    /**
     * Export all circles of trust
     * @param {string[]} entityProviders filter by entity providers
     */
    exportCirclesOfTrust(entityProviders?: string[]): Promise<CirclesOfTrustExportInterface>;
    /**
     * Import a circle of trust by id/name from file
     * @param {string} cotId Circle of trust id/name
     * @param {CirclesOfTrustExportInterface} importData Import data
     * @returns {Promise<CircleOfTrustSkeleton[]>} a promise resolving to the circle of trust object that was created or updated. Note: If the circle of trust already exists and does not need updating, null is returned.
     */
    importCircleOfTrust(cotId: string, importData: CirclesOfTrustExportInterface): Promise<CircleOfTrustSkeleton>;
    /**
     * Import first circle of trust
     * @param {CirclesOfTrustExportInterface} importData Import data
     * @returns {Promise<CircleOfTrustSkeleton[]>} a promise resolving to the circle of trust object that was created or updated. Note: If the circle of trust already exists and does not need updating, null is returned.
     */
    importFirstCircleOfTrust(importData: CirclesOfTrustExportInterface): Promise<CircleOfTrustSkeleton>;
    /**
     * Import all circles of trust
     * @param {string[]} entityProviders filter by entity providers
     * @param {CirclesOfTrustExportInterface} importData Import data
     * @returns {Promise<CircleOfTrustSkeleton[]>} a promise resolving to an array of circle of trust objects that were created or updated. Note: If a circle of trust already exists and does not need updating, it is omitted from the response array.
     */
    importCirclesOfTrust(importData: CirclesOfTrustExportInterface, entityProviders?: string[]): Promise<CircleOfTrustSkeleton[]>;
    /**
     * Get all circles of trust
     * @returns {Promise<CircleOfTrustSkeleton[]>} a promise resolving to an array of circle of trust objects
     * @deprecated since v2.0.0 use {@link CirclesOfTrust.readCirclesOfTrust | readCirclesOfTrust} instead
     * ```javascript
     * readCirclesOfTrust(): Promise<CircleOfTrustSkeleton[]>
     * ```
     * @group Deprecated
     */
    getCirclesOfTrust(): Promise<CircleOfTrustSkeleton[]>;
    /**
     * Get circle of trust
     * @param {string} cotId circle of trust id/name
     * @returns {Promise<CircleOfTrustSkeleton>} a promise resolving to a circle of trust object
     * @deprecated since v2.0.0 use {@link CirclesOfTrust.readCircleOfTrust | readCircleOfTrust} instead
     * ```javascript
     * readCircleOfTrust(cotId: string): Promise<CircleOfTrustSkeleton>
     * ```
     * @group Deprecated
     */
    getCircleOfTrust(cotId: string): Promise<CircleOfTrustSkeleton>;
};
interface CirclesOfTrustExportInterface {
    meta?: ExportMetaData;
    script: Record<string, ScriptSkeleton>;
    saml: {
        hosted: Record<string, Saml2ProviderSkeleton>;
        remote: Record<string, Saml2ProviderSkeleton>;
        metadata: Record<string, string[]>;
        cot: Record<string, CircleOfTrustSkeleton>;
    };
}

type SocialIdpSkeleton = IdObjectSkeletonInterface & {
    _type: AmServiceType;
    enabled: boolean;
    transform: string;
};

type AdminFederationConfigSkeleton = IdObjectSkeletonInterface & {
    groups: {
        claim: string;
        mappings: {
            'super-admins': string[];
            'tenant-admins': string[];
        };
    };
};

type AdminFederation = {
    /**
     * Create an empty idp export template
     * @returns {AdminFederationExportInterface} an empty idp export template
     */
    createAdminFederationExportTemplate(): AdminFederationExportInterface;
    /**
     * Read all admin federation providers
     * @returns {Promise} a promise that resolves to an object containing an array of admin federation providers
     */
    readAdminFederationProviders(): Promise<SocialIdpSkeleton[]>;
    /**
     * Read admin federation provider
     * @param {string} providerId social identity provider id/name
     * @returns {Promise<SocialIdpSkeleton>} a promise that resolves a social admin federation object
     */
    readAdminFederationProvider(providerId: string): Promise<SocialIdpSkeleton>;
    /**
     * Create admin federation provider
     * @param {string} providerType social identity provider type
     * @param {string} providerId social identity provider id/name
     * @param {SocialIdpSkeleton} providerData social identity provider data
     * @returns {Promise<SocialIdpSkeleton>} a promise that resolves a social admin federation object
     */
    createAdminFederationProvider(providerType: string, providerData: SocialIdpSkeleton, providerId?: string): Promise<SocialIdpSkeleton>;
    /**
     * Update or create admin federation provider
     * @param {string} providerType social identity provider type
     * @param {string} providerId social identity provider id/name
     * @param {SocialIdpSkeleton} providerData social identity provider data
     * @returns {Promise<SocialIdpSkeleton>} a promise that resolves a social admin federation object
     */
    updateAdminFederationProvider(providerType: string, providerId: string, providerData: SocialIdpSkeleton): Promise<SocialIdpSkeleton>;
    /**
     * Delete admin federation provider by id
     * @param {String} providerId admin federation provider id/name
     * @returns {Promise} a promise that resolves to an admin federation provider object
     */
    deleteAdminFederationProvider(providerId: string): Promise<SocialIdpSkeleton>;
    /**
     * Export admin federation provider by id
     * @param {string} providerId provider id/name
     * @returns {Promise<AdminFederationExportInterface>} a promise that resolves to a SocialProviderExportInterface object
     */
    exportAdminFederationProvider(providerId: string): Promise<AdminFederationExportInterface>;
    /**
     * Export all providers
     * @returns {Promise<AdminFederationExportInterface>} a promise that resolves to a SocialProviderExportInterface object
     */
    exportAdminFederationProviders(): Promise<AdminFederationExportInterface>;
    /**
     * Import admin federation provider by id/name
     * @param {string} providerId provider id/name
     * @param {AdminFederationExportInterface} importData import data
     */
    importAdminFederationProvider(providerId: string, importData: AdminFederationExportInterface): Promise<SocialIdpSkeleton>;
    /**
     * Import first provider
     * @param {AdminFederationExportInterface} importData import data
     */
    importFirstAdminFederationProvider(importData: AdminFederationExportInterface): Promise<SocialIdpSkeleton>;
    /**
     * Import all providers
     * @param {AdminFederationExportInterface} importData import data
     */
    importAdminFederationProviders(importData: AdminFederationExportInterface): Promise<SocialIdpSkeleton[]>;
    /**
     * Get all admin federation providers
     * @returns {Promise<SocialIdpSkeleton[]>} a promise that resolves to an object containing an array of admin federation providers
     * @deprecated since v2.0.0 use {@link AdminFederation.readAdminFederationProviders | readAdminFederationProviders} instead
     * ```javascript
     * readAdminFederationProviders(): Promise<SocialIdpSkeleton[]>
     * ```
     * @group Deprecated
     */
    getAdminFederationProviders(): Promise<SocialIdpSkeleton[]>;
    /**
     * Get admin federation provider
     * @param {String} providerId social identity provider id/name
     * @returns {Promise} a promise that resolves a social admin federation object
     * @deprecated since v2.0.0 use {@link AdminFederation.readAdminFederationProvider | readAdminFederationProvider} instead
     * ```javascript
     * readAdminFederationProvider(providerId: string): Promise<SocialIdpSkeleton>
     * ```
     * @group Deprecated
     */
    getAdminFederationProvider(providerId: string): Promise<SocialIdpSkeleton>;
    /**
     * Update or create admin federation provider
     * @param {string} providerType social identity provider type
     * @param {string} providerId social identity provider id/name
     * @param {SocialIdpSkeleton} providerData social identity provider data
     * @returns {Promise<SocialIdpSkeleton>} a promise that resolves a social admin federation object
     * @deprecated since v2.0.0 use {@link AdminFederation.updateAdminFederationProvider | updateAdminFederationProvider} instead
     * ```javascript
     * updateAdminFederationProvider(providerType: string, providerId: string, providerData: SocialIdpSkeleton): Promise<SocialIdpSkeleton>
     * ```
     * @group Deprecated
     */
    putProviderByTypeAndId(providerType: string, providerId: string, providerData: SocialIdpSkeleton): Promise<SocialIdpSkeleton>;
};
interface AdminFederationExportInterface {
    meta?: ExportMetaData;
    config: Record<string, AdminFederationConfigSkeleton>;
    idp: Record<string, SocialIdpSkeleton>;
}

type Feature = {
    /**
     * Get all features
     * @returns {Promise<FeatureInterface[]>} a promise that resolves to an array of feature objects
     */
    getFeatures(): Promise<FeatureInterface[]>;
    /**
     * Check if feature is available
     * @param {string} featureId feature id (e.g. 'service-accounts')
     * @returns {Promise<boolean>} a promise that resolves to true if the feature is available and to false otherwise
     */
    hasFeature(featureId: string): Promise<boolean>;
};

type LogApiKey = {
    name: string;
    api_key_id: string;
    api_key_secret?: string;
    created_at: string;
};
type LogEventPayloadSkeleton = NoIdObjectSkeletonInterface & {
    context: string;
    level: string;
    logger: string;
    mdc: {
        transactionId: string;
    };
    message: string;
    thread: string;
    timestamp: string;
    transactionId: string;
};
type LogEventSkeleton = NoIdObjectSkeletonInterface & {
    payload: string | LogEventPayloadSkeleton;
    timestamp: string;
    type: string;
    source: string;
};

type Log = {
    /**
     * Get default noise filter
     * @returns {string[]} array of default event types and loggers to be filtered out
     */
    getDefaultNoiseFilter(): string[];
    /**
     * Resolve log level to an array of effective log levels
     * @param level string or numeric log level: 'FATAL', 'ERROR', 'WARN', 'INFO', 'DEBUG', 'TRACE', 'ALL', 0, 1, 2, 3, 4
     * @returns {string[]} array of effective log levels
     */
    resolveLevel(level: string | number): string[];
    /**
     * Resolve a log event's level
     * @param {object} log log event
     * @returns {string} log level
     */
    resolvePayloadLevel(log: LogEventSkeleton): string;
    /**
     * Get available log sources
     * @returns {Promise<string[]>} promise resolving to an array of available log sources
     */
    getLogSources(): Promise<string[]>;
    /**
     * Get log api key
     * @param {string} keyId key id
     * @returns {Promise<LogApiKey>} promise resolving to a LogApiKey objects
     */
    getLogApiKey(keyId: string): Promise<LogApiKey>;
    /**
     * Validate log api key and secret
     * @param {string} keyId log api key id
     * @param {string} secret log api secret
     * @returns {Promise<boolean>} a promise resolving to true if the key is valid, false otherwise
     */
    isLogApiKeyValid(keyId: string, secret: string): Promise<boolean>;
    /**
     * Get log api keys
     * @returns {Promise<LogApiKey[]>} promise resolving to an array of LogApiKey objects
     */
    getLogApiKeys(): Promise<LogApiKey[]>;
    /**
     * Create log api key
     * @param {string} keyName human-readable key name
     * @returns {Promise<LogApiKey>} a promise resolving to an object containing the log api key and secret
     */
    createLogApiKey(keyName: string): Promise<LogApiKey>;
    /**
     * Delete log api key
     * @param {string} keyId key id
     * @returns {Promise<LogApiKey>} a promise resolving to an object containing the log api key
     */
    deleteLogApiKey(keyId: string): Promise<LogApiKey>;
    /**
     * Delete all log api keys
     * @returns {Promise<LogApiKey>} a promise resolving to an array of log api key objects
     */
    deleteLogApiKeys(): Promise<LogApiKey[]>;
    /**
     * Tail logs
     * @param {string} source log source(s) to tail
     * @param {string} cookie paged results cookie
     * @returns {Promise<PagedResult<LogEventSkeleton>>} promise resolving to paged log event result
     */
    tail(source: string, cookie: string): Promise<PagedResult<LogEventSkeleton>>;
    /**
     * Fetch logs
     * @param {string} source log source(s) to tail
     * @param {string} startTs start timestamp
     * @param {string} endTs end timestamp
     * @param {string} cookie paged results cookie
     * @returns {Promise<PagedResult<LogEventSkeleton>>} promise resolving to paged log event result
     */
    fetch(source: string, startTs: string, endTs: string, cookie: string): Promise<PagedResult<LogEventSkeleton>>;
};

/**
 * Secret encoding
 *
 * @summary
 * You can use the encoding parameter to set an encoding format when you create an ESV secret.
 * You can only choose an encoding format using the API. The UI currently creates secrets only
 * with the generic encoding format.
 *
 * @see
 * {@link https://backstage.forgerock.com/docs/idcloud/latest/tenants/esvs.html#encoding_format | ForgeRock Documentation}
 */
type SecretEncodingType = 'generic' | 'pem' | 'base64hmac';
/**
 * Secret object skeleton
 */
type SecretSkeleton = IdObjectSkeletonInterface & {
    description: string;
    encoding: SecretEncodingType;
    lastChangedBy?: string;
    lastChangeDate?: string;
    useInPlaceholders: boolean;
    loaded?: boolean;
    loadedVersion?: string;
    activeVersion?: string;
};
type VersionOfSecretStatus = 'DISABLED' | 'ENABLED' | 'DESTROYED';
/**
 * Secret version skeleton
 */
type VersionOfSecretSkeleton = IdObjectSkeletonInterface & {
    /**
     * Base64-encoded value. Only used when creating a new version of a secret
     */
    valueBase64?: string;
    /**
     * Version string. Returned when reading a version of a secret
     */
    version?: string;
    /**
     * Date string. Returned when reading a version of a secret
     */
    createDate?: string;
    /**
     * True if loaded, false otherwise. Returned when reading a version of a secret
     */
    loaded?: boolean;
    /**
     * Status string. Returned when reading a version of a secret
     */
    status?: VersionOfSecretStatus;
};

type Secret = {
    /**
     * Read all secrets
     * @returns {Promise<SecretSkeleton[]>} a promise that resolves to an array of secrets
     */
    readSecrets(): Promise<SecretSkeleton[]>;
    /**
     * Read secret
     * @param secretId secret id/name
     * @returns {Promise<SecretSkeleton>} a promise that resolves to a secret
     */
    readSecret(secretId: string): Promise<SecretSkeleton>;
    /**
     * Export secret. The response can be saved to file as is.
     * @param secretId secret id/name
     * @returns {Promise<SecretsExportInterface>} Promise resolving to a SecretsExportInterface object.
     */
    exportSecret(secretId: any): Promise<SecretsExportInterface>;
    /**
     * Export all secrets
     * @returns {Promise<SecretsExportInterface>} Promise resolving to an SecretsExportInterface object.
     */
    exportSecrets(): Promise<SecretsExportInterface>;
    /**
     * Create secret
     * @param {string} secretId secret id/name
     * @param {string} value secret value
     * @param {string} description secret description
     * @param {string} encoding secret encoding (only `generic` is supported)
     * @param {boolean} useInPlaceholders flag indicating if the secret can be used in placeholders
     * @returns {Promise<SecretSkeleton>} a promise that resolves to a secret
     */
    createSecret(secretId: string, value: string, description: string, encoding?: string, useInPlaceholders?: boolean): Promise<SecretSkeleton>;
    /**
     * Update secret description
     * @param {string} secretId secret id/name
     * @param {string} description secret description
     * @returns {Promise<any>} a promise that resolves to an empty string
     */
    updateSecretDescription(secretId: string, description: string): Promise<any>;
    /**
     * Delete secret
     * @param {string} secretId secret id/name
     * @returns {Promise<SecretSkeleton>} a promise that resolves to a secret object
     */
    deleteSecret(secretId: string): Promise<SecretSkeleton>;
    /**
     * Read versions of secret
     * @param {string} secretId secret id/name
     * @returns {Promise<VersionOfSecretSkeleton[]>} a promise that resolves to an array of secret versions
     */
    readVersionsOfSecret(secretId: string): Promise<VersionOfSecretSkeleton[]>;
    /**
     * Create version of secret
     * @param {string} secretId secret id/name
     * @param {string} value secret value
     * @returns {Promise<VersionOfSecretSkeleton>} a promise that resolves to a version object
     */
    createVersionOfSecret(secretId: string, value: string): Promise<VersionOfSecretSkeleton>;
    /**
     * Read version of secret
     * @param {string} secretId secret id/name
     * @param {string} version secret version
     * @returns {Promise<VersionOfSecretSkeleton>} a promise that resolves to a version object
     */
    readVersionOfSecret(secretId: string, version: string): Promise<VersionOfSecretSkeleton>;
    /**
     * Enable a version of a secret
     * @param {string} secretId secret id/name
     * @param {string} version secret version
     * @returns {Promise<VersionOfSecretSkeleton>} a promise that resolves to a status object
     */
    enableVersionOfSecret(secretId: string, version: string): Promise<VersionOfSecretSkeleton>;
    /**
     * Disable a version of a secret
     * @param {string} secretId secret id/name
     * @param {string} version secret version
     * @returns {Promise<VersionOfSecretSkeleton>} a promise that resolves to a status object
     */
    disableVersionOfSecret(secretId: string, version: string): Promise<VersionOfSecretSkeleton>;
    /**
     * Delete version of secret
     * @param {string} secretId secret id/name
     * @param {string} version secret version
     * @returns {Promise<VersionOfSecretSkeleton>} a promise that resolves to a version object
     */
    deleteVersionOfSecret(secretId: string, version: string): Promise<VersionOfSecretSkeleton>;
    /**
     * Get all secrets
     * @returns {Promise<any[]>} a promise that resolves to an array of secrets
     * @deprecated since v2.0.0 use {@link Secret.readSecrets | readSecrets} instead
     * ```javascript
     * readSecrets(): Promise<SecretSkeleton[]>
     * ```
     * @group Deprecated
     */
    getSecrets(): Promise<SecretSkeleton[]>;
    /**
     * Get secret
     * @param secretId secret id/name
     * @returns {Promise<SecretSkeleton>} a promise that resolves to a secret
     * @deprecated since v2.0.0 use {@link Secret.readSecret | readSecret} instead
     * ```javascript
     * readSecret(secretId: string): Promise<any>
     * ```
     * @group Deprecated
     */
    getSecret(secretId: string): Promise<SecretSkeleton>;
    /**
     * Create secret
     * @param {string} secretId secret id/name
     * @param {string} value secret value
     * @param {string} description secret description
     * @param {string} encoding secret encoding (only `generic` is supported)
     * @param {boolean} useInPlaceholders flag indicating if the secret can be used in placeholders
     * @returns {Promise<SecretSkeleton>} a promise that resolves to a secret
     * @deprecated since v2.0.0 use {@link Secret.createSecret | createSecret} instead
     * ```javascript
     * createSecret(secretId: string, value: string, description: string, encoding?: string, useInPlaceholders?: boolean): Promise<any>
     * ```
     * @group Deprecated
     */
    putSecret(secretId: string, value: string, description: string, encoding?: string, useInPlaceholders?: boolean): Promise<SecretSkeleton>;
    /**
     * Set secret description
     * @param {string} secretId secret id/name
     * @param {string} description secret description
     * @returns {Promise<any>} a promise that resolves to an empty string
     * @deprecated since v2.0.0 use {@link Secret.updateSecretDescription | updateSecretDescription} instead
     * ```javascript
     * updateSecretDescription(secretId: string, description: string): Promise<any>
     * ```
     * @group Deprecated
     */
    setSecretDescription(secretId: string, description: string): Promise<any>;
    /**
     * Get secret versions
     * @param {string} secretId secret id/name
     * @returns {Promise<VersionOfSecretSkeleton[]>} a promise that resolves to an array of secret versions
     * @deprecated since v2.0.0 use {@link Secret.readVersionsOfSecret | readVersionsOfSecret} instead
     * ```javascript
     * readVersionsOfSecret(secretId: string): Promise<any>
     * ```
     * @group Deprecated
     */
    getSecretVersions(secretId: string): Promise<VersionOfSecretSkeleton[]>;
    /**
     * Create new secret version
     * @param {string} secretId secret id/name
     * @param {string} value secret value
     * @returns {Promise<VersionOfSecretSkeleton>} a promise that resolves to a version object
     * @deprecated since v2.0.0 use {@link Secret.createVersionOfSecret | createVersionOfSecret} instead
     * ```javascript
     * createVersionOfSecret(secretId: string, value: string): Promise<any>
     * ```
     * @group Deprecated
     */
    createNewVersionOfSecret(secretId: string, value: string): Promise<VersionOfSecretSkeleton>;
    /**
     * Get version of secret
     * @param {string} secretId secret id/name
     * @param {string} version secret version
     * @returns {Promise<VersionOfSecretSkeleton>} a promise that resolves to a version object
     * @deprecated since v2.0.0 use {@link Secret.readVersionOfSecret | readVersionOfSecret} instead
     * ```javascript
     * readVersionOfSecret(secretId: string, version: string): Promise<any>
     * ```
     * @group Deprecated
     */
    getVersionOfSecret(secretId: string, version: string): Promise<VersionOfSecretSkeleton>;
    /**
     * Update the status of a version of a secret
     * @param {string} secretId secret id/name
     * @param {string} version secret version
     * @param {VersionOfSecretStatus} status status
     * @returns {Promise<VersionOfSecretSkeleton>} a promise that resolves to a status object
     * @deprecated since v2.0.0 use {@link Secret.enableVersionOfSecret | enableVersionOfSecret} or {@link Secret.disableVersionOfSecret | disableVersionOfSecret} instead
     * ```javascript
     * enableVersionOfSecret(secretId: string, version: string): Promise<any>
     * disableVersionOfSecret(secretId: string, version: string): Promise<any>
     * ```
     * @group Deprecated
     */
    setStatusOfVersionOfSecret(secretId: string, version: string, status: VersionOfSecretStatus): Promise<VersionOfSecretSkeleton>;
};
interface SecretsExportInterface {
    meta?: ExportMetaData;
    secrets: Record<string, SecretSkeleton>;
}

type ServiceAccount = {
    /**
     * Check if service accounts are available
     * @returns {Promise<boolean>} true if service accounts are available, false otherwise
     */
    isServiceAccountsFeatureAvailable(): Promise<boolean>;
    /**
     * Create service account
     * @param {string} name Human-readable name of service account
     * @param {string} description Description of service account
     * @param {'Active' | 'Inactive'} accountStatus Service account status
     * @param {string[]} scopes Scopes.
     * @param {JwksInterface} jwks Java Web Key Set
     * @returns {Promise<IdObjectSkeletonInterface>} A promise resolving to a service account object
     */
    createServiceAccount(name: string, description: string, accountStatus: 'active' | 'inactive', scopes: string[], jwks: JwksInterface): Promise<IdObjectSkeletonInterface>;
    /**
     * Get service account
     * @param {string} serviceAccountId service account id
     * @returns {Promise<ServiceAccountType>} a promise resolving to a service account object
     */
    getServiceAccount(serviceAccountId: string): Promise<ServiceAccountType>;
};
type ServiceAccountType = IdObjectSkeletonInterface & {
    name: string;
    description: string;
    accountStatus: 'active' | 'inactive';
    scopes: string[];
    jwks: string;
};

type Startup = {
    /**
     * Check for updates that need applying
     * @returns {Promise<Updates>} true if there are updates that need to be applied, false otherwise
     */
    checkForUpdates(): Promise<Updates>;
    /**
     * Apply updates
     * @param {boolean} wait wait for the operation to complete or not
     * @param {number} timeout timeout in milliseconds
     * @returns {Promise<boolean>} true if successful, false otherwise
     */
    applyUpdates(wait: boolean, timeout?: number): Promise<boolean>;
};
/**
 * Updates that need to be applied.
 */
interface Updates {
    /**
     * Array of secrets that need applying
     */
    secrets?: unknown[];
    /**
     * Array of variables that need applying
     */
    variables?: unknown[];
}

/**
 * Variable types
 *
 * @summary
 * You can use the expressionType parameter to set a type when you create an ESV variable.
 * This lets Identity Cloud correctly transform the value of the ESV
 * to match the configuration property type when substituting it into configuration.
 *
 * The type is set when the ESV is created, and cannot be modified after creation.
 * If you do not specify a type, it will default to string.
 *
 * Before the expressionType parameter was introduced, it was only possible to set types
 * from within configuration, using expression level syntax; for example,
 * {"$int": "&{esv.journey.ldap.port|1389}"}.
 * The expressionType parameter supplements this expression level syntax and allows the
 * ESV type to be identified without inspecting configuration.
 *
 * @see
 * {@link https://backstage.forgerock.com/docs/idcloud/latest/tenants/esvs.html#variable_types | ForgeRock Documentation}
 */
type VariableExpressionType = 'array' | 'base64encodedinlined' | 'bool' | 'int' | 'keyvaluelist' | 'list' | 'number' | 'object' | 'string';
/**
 * Variable object skeleton
 */
type VariableSkeleton = IdObjectSkeletonInterface & {
    valueBase64: string;
    description?: string;
    loaded?: boolean;
    lastChangedBy?: string;
    lastChangeDate?: string;
    expressionType?: VariableExpressionType;
};

type Variable = {
    /**
     * Read variable by id/name
     * @param {string} variableId variable id/name
     * @returns {Promise<VariableSkeleton>} a promise that resolves to a variable object
     */
    readVariable(variableId: string): Promise<VariableSkeleton>;
    /**
     * Read all variables
     * @returns {Promise<VariableSkeleton[]>} a promise that resolves to an array of variable objects
     */
    readVariables(): Promise<VariableSkeleton[]>;
    /**
     * Export variable. The response can be saved to file as is.
     * @param variableId variable id/name
     * @param noDecode Do not include decoded variable value in export
     * @returns {Promise<VariablesExportInterface>} Promise resolving to a VariablesExportInterface object.
     */
    exportVariable(variableId: string, noDecode: boolean): Promise<VariablesExportInterface>;
    /**
     * Export all variables
     * @param noDecode Do not include decoded variable value in export
     * @returns {Promise<VariablesExportInterface>} Promise resolving to an VariablesExportInterface object.
     */
    exportVariables(noDecode: boolean): Promise<VariablesExportInterface>;
    /**
     * Create variable
     * @param {string} variableId variable id/name
     * @param {string} value variable value
     * @param {string} description variable description
     * @param {VariableExpressionType} expressionType type of the value
     * @returns {Promise<VariableSkeleton>} a promise that resolves to a variable object
     */
    createVariable(variableId: string, value: string, description: string, expressionType?: VariableExpressionType): Promise<VariableSkeleton>;
    /**
     * Update or create variable
     * @param {string} variableId variable id/name
     * @param {string} value variable value
     * @param {string} description variable description
     * @param {VariableExpressionType} expressionType type of the value
     * @returns {Promise<VariableSkeleton>} a promise that resolves to a variable object
     */
    updateVariable(variableId: string, value: string, description: string, expressionType?: VariableExpressionType): Promise<VariableSkeleton>;
    /**
     * Update variable description
     * @param {string} variableId variable id/name
     * @param {string} description variable description
     * @returns {Promise<VariableSkeleton>} a promise that resolves to a status object
     */
    updateVariableDescription(variableId: string, description: string): Promise<VariableSkeleton>;
    /**
     * Delete variable by id/name
     * @param {string} variableId variable id/name
     * @returns {Promise<VariableSkeleton>} a promise that resolves to a variable object
     */
    deleteVariable(variableId: string): Promise<VariableSkeleton>;
    /**
     * Get variable by id/name
     * @param {string} variableId variable id/name
     * @returns {Promise<VariableSkeleton>} a promise that resolves to a variable object
     * @deprecated since v2.0.0 use {@link Variable.readVariable | readVariable} instead
     * ```javascript
     * readVariable(variableId: string): Promise<VariableSkeleton>
     * ```
     * @group Deprecated
     */
    getVariable(variableId: string): Promise<VariableSkeleton>;
    /**
     * Get all variables
     * @returns {Promise<VariableSkeleton[]>} a promise that resolves to an array of variable objects
     * @deprecated since v2.0.0 use {@link Variable.readVariables | readVariables} instead
     * ```javascript
     * readVariables(): Promise<VariableSkeleton[]>
     * ```
     * @group Deprecated
     */
    getVariables(): Promise<VariableSkeleton[]>;
    /**
     * Create variable
     * @param {string} variableId variable id/name
     * @param {string} value variable value
     * @param {string} description variable description
     * @param {VariableExpressionType} expressionType type of the value
     * @returns {Promise<VariableSkeleton>} a promise that resolves to a variable object
     * @deprecated since v2.0.0 use {@link Variable.createVariable | createVariable} instead
     * ```javascript
     * createVariable(variableId: string, value: string, description: string, expressionType?: VariableExpressionType): Promise<VariableSkeleton>
     * ```
     * @group Deprecated
     */
    putVariable(variableId: string, value: string, description: string, expressionType?: VariableExpressionType): Promise<VariableSkeleton>;
    /**
     * Set variable description
     * @param {string} variableId variable id/name
     * @param {string} description variable description
     * @returns {Promise<any>} a promise that resolves to an empty string
     * @deprecated since v2.0.0 use {@link Variable.updateVariableDescription | updateVariableDescription} instead
     * ```javascript
     * updateVariableDescription(variableId: string, description: string): Promise<any>
     * ```
     * @group Deprecated
     */
    setVariableDescription(variableId: string, description: string): Promise<any>;
};
interface VariablesExportInterface {
    meta?: ExportMetaData;
    variables: Record<string, VariableSkeleton>;
}

type PolicyConditionType = 'Script' | 'AMIdentityMembership' | 'IPv6' | 'IPv4' | 'SimpleTime' | 'LEAuthLevel' | 'LDAPFilter' | 'AuthScheme' | 'Session' | 'AND' | 'AuthenticateToRealm' | 'ResourceEnvIP' | 'Policy' | 'OAuth2Scope' | 'SessionProperty' | 'OR' | 'Transaction' | 'NOT' | 'AuthLevel' | 'AuthenticateToService';
type PolicyCondition = NoIdObjectSkeletonInterface & {
    type: PolicyConditionType;
    condition?: PolicyCondition;
    conditions?: PolicyCondition[];
};
type PolicySkeleton = IdObjectSkeletonInterface & {
    name: string;
    applicationName: string;
    condition?: PolicyCondition;
    resourceTypeUuid: string;
};

type PolicySetSkeleton = NoIdObjectSkeletonInterface & {
    name: string;
    resourceTypeUuids: string[];
};

type ResourceTypeSkeleton = NoIdObjectSkeletonInterface & {
    uuid: string;
    name: string;
};

type EmailTemplate = {
    /**
     * Email template type key used to build the IDM id: 'emailTemplate/<id>'
     */
    EMAIL_TEMPLATE_TYPE: string;
    /**
     * Create an empty email template export template
     * @returns {EmailTemplateExportInterface} an empty email template export template
     */
    createEmailTemplateExportTemplate(): EmailTemplateExportInterface;
    /**
     * Get all email templates
     * @returns {Promise<EmailTemplateSkeleton[]>} a promise that resolves to an array of email template objects
     */
    readEmailTemplates(): Promise<EmailTemplateSkeleton[]>;
    /**
     * Get email template
     * @param {string} templateId id/name of the email template without the type prefix
     * @returns {Promise<EmailTemplateSkeleton>} a promise that resolves an email template object
     */
    readEmailTemplate(templateId: string): Promise<EmailTemplateSkeleton>;
    /**
     * Export all email templates. The response can be saved to file as is.
     * @returns {Promise<EmailTemplateExportInterface>} Promise resolving to a EmailTemplateExportInterface object.
     */
    exportEmailTemplates(): Promise<EmailTemplateExportInterface>;
    /**
     * Create email template
     * @param {string} templateId id/name of the email template without the type prefix
     * @param {EmailTemplateSkeleton} templateData email template object
     * @returns {Promise<EmailTemplateSkeleton>} a promise that resolves to an email template object
     */
    createEmailTemplate(templateId: string, templateData: EmailTemplateSkeleton): Promise<EmailTemplateSkeleton>;
    /**
     * Update or create email template
     * @param {string} templateId id/name of the email template without the type prefix
     * @param {EmailTemplateSkeleton} templateData email template object
     * @returns {Promise<EmailTemplateSkeleton>} a promise that resolves to an email template object
     */
    updateEmailTemplate(templateId: string, templateData: EmailTemplateSkeleton): Promise<EmailTemplateSkeleton>;
    /**
     * Import all email templates
     * @param {EmailTemplateExportInterface} importData import data
     * @returns {Promise<IdObjectSkeletonInterface[]>} a promise resolving to an array of email template objects
     */
    importEmailTemplates(importData: EmailTemplateExportInterface): Promise<EmailTemplateSkeleton[]>;
    /**
     * Delete all email templates
     * @returns {Promise<EmailTemplateSkeleton[]>} a promise that resolves to an array of email template objects
     */
    deleteEmailTemplates(): Promise<EmailTemplateSkeleton[]>;
    /**
     * Delete email template
     * @param {string} templateId id/name of the email template without the type prefix 'emailTemplate/'
     * @returns {Promise<EmailTemplateSkeleton>} a promise that resolves an email template object
     */
    deleteEmailTemplate(templateId: string): Promise<EmailTemplateSkeleton>;
    /**
     * Get all email templates
     * @returns {Promise<EmailTemplateSkeleton[]>} a promise that resolves to an array of email template objects
     * @deprecated since v2.0.0 use {@link EmailTemplate.readEmailTemplates | readEmailTemplates} instead
     * ```javascript
     * readEmailTemplates(): Promise<EmailTemplateSkeleton[]>
     * ```
     * @group Deprecated
     */
    getEmailTemplates(): Promise<EmailTemplateSkeleton[]>;
    /**
     * Get email template
     * @param {string} templateId id/name of the email template without the type prefix
     * @returns {Promise<EmailTemplateSkeleton>} a promise that resolves an email template object
     * @deprecated since v2.0.0 use {@link EmailTemplate.readEmailTemplate | readEmailTemplate} instead
     * ```javascript
     * readEmailTemplate(templateId: string): Promise<EmailTemplateSkeleton>
     * ```
     * @group Deprecated
     */
    getEmailTemplate(templateId: string): Promise<EmailTemplateSkeleton>;
    /**
     * Put email template
     * @param {string} templateId id/name of the email template without the type prefix
     * @param {Object} templateData email template object
     * @returns {Promise<EmailTemplateSkeleton>} a promise that resolves to an email template object
     * @deprecated since v2.0.0 use {@link EmailTemplate.updateEmailTemplate | updateEmailTemplate} or {@link EmailTemplate.createEmailTemplate | createEmailTemplate} instead
     * ```javascript
     * updateEmailTemplate(templateId: string, templateData: EmailTemplateSkeleton): Promise<EmailTemplateSkeleton>
     * createEmailTemplate(templateId: string, templateData: EmailTemplateSkeleton): Promise<EmailTemplateSkeleton>
     * ```
     * @group Deprecated
     */
    putEmailTemplate(templateId: string, templateData: EmailTemplateSkeleton): Promise<EmailTemplateSkeleton>;
};
type EmailTemplateSkeleton = IdObjectSkeletonInterface & {
    defaultLocale?: string;
    displayName?: string;
    enabled?: boolean;
    from: string;
    subject: Record<string, string>;
    message?: Record<string, string>;
    html?: Record<string, string>;
};
interface EmailTemplateExportInterface {
    meta?: ExportMetaData;
    emailTemplate: Record<string, EmailTemplateSkeleton>;
}

interface NodeRefSkeletonInterface {
    connections: Record<string, string>;
    displayName: string;
    nodeType: string;
    x: number;
    y: number;
}
interface InnerNodeRefSkeletonInterface {
    _id: string;
    displayName: string;
    nodeType: string;
}
type NodeSkeleton = IdObjectSkeletonInterface & {
    _type: AmServiceType;
    nodes?: InnerNodeRefSkeletonInterface[];
    tree?: string;
    identityResource?: string;
    script?: string;
    emailTemplateName?: string;
    filteredProviders?: string[];
    useScript?: boolean;
};

interface UiConfigInterface {
    categories: string;
}
type TreeSkeleton = IdObjectSkeletonInterface & {
    entryNodeId: string;
    nodes: Record<string, NodeRefSkeletonInterface>;
    identityResource?: string;
    uiConfig?: UiConfigInterface;
    enabled?: boolean;
    innerTreeOnly?: boolean;
};

type ThemeSkeleton = IdObjectSkeletonInterface & {
    name: string;
    isDefault: boolean;
    linkedTrees: string[];
};
type Theme = {
    /**
     * Create an empty theme export template
     * @returns {ThemeExportInterface} an empty theme export template
     */
    createThemeExportTemplate(): ThemeExportInterface;
    /**
     * Read all themes
     * @param {string} realm realm name
     * @returns {Promise<ThemeSkeleton[]>} a promise that resolves to an array of themes
     */
    readThemes(): Promise<ThemeSkeleton[]>;
    /**
     * Read theme by id
     * @param {string} themeId theme id
     * @param {string} realm realm name
     * @returns {Promise<ThemeSkeleton>} a promise that resolves to a theme object
     */
    readTheme(themeId: string, realm?: string): Promise<ThemeSkeleton>;
    /**
     * Read theme by name
     * @param {string} themeName theme name
     * @param {string} realm realm name
     * @returns {Promise<ThemeSkeleton>} a promise that resolves to a theme object
     */
    readThemeByName(themeName: string, realm?: string): Promise<ThemeSkeleton>;
    /**
     * Export all themes. The response can be saved to file as is.
     * @returns {Promise<ThemeExportInterface>} Promise resolving to a ThemeExportInterface object.
     */
    exportThemes(): Promise<ThemeExportInterface>;
    /**
     * Update theme
     * @param {ThemeSkeleton} themeData theme object
     * @param {string} themeId theme id
     * @param {string} realm realm name
     * @returns {Promise<ThemeSkeleton>} a promise that resolves to a theme object
     */
    createTheme(themeData: ThemeSkeleton, themeId?: string, realm?: string): Promise<ThemeSkeleton>;
    /**
     * Update theme
     * @param {string} themeId theme id
     * @param {ThemeSkeleton} themeData theme object
     * @param {string} realm realm name
     * @returns {Promise<ThemeSkeleton>} a promise that resolves to a theme object
     */
    updateTheme(themeId: string, themeData: ThemeSkeleton, realm?: string): Promise<ThemeSkeleton>;
    /**
     * Update theme by name
     * @param {String} themeName theme name
     * @param {ThemeSkeleton} themeData theme object
     * @param {string} realm realm name
     * @returns {Promise<ThemeSkeleton>} a promise that resolves to a theme object
     */
    updateThemeByName(themeName: string, themeData: ThemeSkeleton, realm?: string): Promise<ThemeSkeleton>;
    /**
     * Update all themes
     * @param {Map<string, ThemeSkeleton>} allThemesData themes object containing all themes for all realms
     * @param {string} realm realm name
     * @returns {Promise<Map<string, ThemeSkeleton>>} a promise that resolves to a themes object
     */
    updateThemes(themeMap: Record<string, ThemeSkeleton>): Promise<Record<string, ThemeSkeleton>>;
    /**
     * Import themes
     * @param {ThemeExportInterface} importData import data
     * @returns {Promise<ThemeSkeleton[]>} a promise resolving to an array of theme objects
     */
    importThemes(importData: ThemeExportInterface): Promise<ThemeSkeleton[]>;
    /**
     * Delete theme by id
     * @param {string} themeId theme id
     * @param {string} realm realm name
     * @returns {Promise<ThemeSkeleton>} a promise that resolves to a themes object
     */
    deleteTheme(themeId: string, realm?: string): Promise<ThemeSkeleton>;
    /**
     * Delete theme by name
     * @param {string} themeName theme name
     * @param {string} realm realm name
     * @returns {Promise<ThemeSkeleton>} a promise that resolves to a themes object
     */
    deleteThemeByName(themeName: string, realm?: string): Promise<ThemeSkeleton>;
    /**
     * Delete all themes
     * @param {string} realm realm name
     * @returns {Promise<ThemeSkeleton[]>} a promise that resolves to an array of themes
     */
    deleteThemes(realm?: string): Promise<ThemeSkeleton[]>;
    /**
     * Get all themes
     * @param {string} realm realm name
     * @returns {Promise<ThemeSkeleton[]>} a promise that resolves to an array of themes
     * @deprecated since v2.0.0 use {@link Theme.readThemes | readThemes} instead
     * ```javascript
     * readThemes(): Promise<ThemeSkeleton[]>
     * ```
     * @group Deprecated
     */
    getThemes(): Promise<ThemeSkeleton[]>;
    /**
     * Get theme by id
     * @param {string} themeId theme id
     * @param {string} realm realm name
     * @returns {Promise<ThemeSkeleton>} a promise that resolves to a theme object
     * @deprecated since v2.0.0 use {@link Theme.readTheme | readTheme} instead
     * ```javascript
     * readTheme(themeId: string, realm?: string): Promise<ThemeSkeleton>
     * ```
     * @group Deprecated
     */
    getTheme(themeId: string, realm?: string): Promise<ThemeSkeleton>;
    /**
     * Get theme by name
     * @param {string} themeName theme name
     * @param {string} realm realm name
     * @returns {Promise<ThemeSkeleton>} a promise that resolves to a theme object
     * @deprecated since v2.0.0 use {@link Theme.readThemeByName | readThemeByName} instead
     * ```javascript
     * readThemeByName(themeName: string, realm?: string): Promise<ThemeSkeleton>
     * ```
     * @group Deprecated
     */
    getThemeByName(themeName: string, realm?: string): Promise<ThemeSkeleton>;
    /**
     * Put theme by id
     * @param {string} themeId theme id
     * @param {ThemeSkeleton} themeData theme object
     * @param {string} realm realm name
     * @returns {Promise<ThemeSkeleton>} a promise that resolves to a theme object
     * @deprecated since v2.0.0 use {@link Theme.updateTheme | updateTheme} or {@link Theme.createTheme | createTheme} instead
     * ```javascript
     * updateTheme(themeId: string, themeData: ThemeSkeleton, realm?: string): Promise<ThemeSkeleton>
     * createTheme(themeData: ThemeSkeleton, themeId?: string, realm?: string): Promise<ThemeSkeleton>
     * ```
     * @group Deprecated
     */
    putTheme(themeId: string, themeData: ThemeSkeleton, realm?: string): Promise<ThemeSkeleton>;
    /**
     * Put theme by name
     * @param {String} themeName theme name
     * @param {ThemeSkeleton} themeData theme object
     * @param {string} realm realm name
     * @returns {Promise<ThemeSkeleton>} a promise that resolves to a theme object
     * @deprecated since v2.0.0 use {@link Theme.updateThemeByName | updateThemeByName} instead
     * ```javascript
     * updateThemeByName(themeName: string, themeData: ThemeSkeleton, realm?: string): Promise<ThemeSkeleton>
     * ```
     * @group Deprecated
     */
    putThemeByName(themeName: string, themeData: ThemeSkeleton, realm?: string): Promise<ThemeSkeleton>;
    /**
     * Put all themes
     * @param {Map<string, ThemeSkeleton>} allThemesData themes object containing all themes for all realms
     * @param {string} realm realm name
     * @returns {Promise<Map<string, ThemeSkeleton>>} a promise that resolves to a themes object
     * @deprecated since v2.0.0 use {@link Theme.updateThemes | updateThemes} instead
     * ```javascript
     * updateThemes(themeMap: Map<string, ThemeSkeleton>): Promise<Map<string, ThemeSkeleton>>
     * ```
     * @group Deprecated
     */
    putThemes(themeMap: Record<string, ThemeSkeleton>): Promise<Record<string, ThemeSkeleton>>;
};
interface ThemeExportInterface {
    meta?: ExportMetaData;
    theme: Record<string, ThemeSkeleton>;
}

type Journey = {
    /**
     * Create an empty single tree export template
     * @returns {SingleTreeExportInterface} an empty single tree export template
     */
    createSingleTreeExportTemplate(): SingleTreeExportInterface;
    /**
     * Create an empty multi tree export template
     * @returns {MultiTreeExportInterface} an empty multi tree export template
     */
    createMultiTreeExportTemplate(): MultiTreeExportInterface;
    /**
     * Create export data for a tree/journey with all its nodes and dependencies. The export data can be written to a file as is.
     * @param {string} treeId tree id/name
     * @param {TreeExportOptions} options export options
     * @returns {Promise<SingleTreeExportInterface>} a promise that resolves to an object containing the tree and all its nodes and dependencies
     */
    exportJourney(treeId: string, options?: TreeExportOptions): Promise<SingleTreeExportInterface>;
    /**
     * Create export data for all trees/journeys with all their nodes and dependencies. The export data can be written to a file as is.
     * @param {TreeExportOptions} options export options
     * @returns {Promise<MultiTreeExportInterface>} a promise that resolves to an object containing the trees and all their nodes and dependencies
     */
    exportJourneys(options?: TreeExportOptions): Promise<MultiTreeExportInterface>;
    /**
     * Read all journeys without dependencies.
     * @returns {Promise<TreeSkeleton[]>} a promise that resolves to an array of journey objects
     */
    readJourneys(): Promise<TreeSkeleton[]>;
    /**
     * Read journey without dependencies.
     * @param {string} journeyId journey id/name
     * @returns {Promise<TreeSkeleton>} a promise that resolves to a journey object
     */
    readJourney(journeyId: string): Promise<TreeSkeleton>;
    /**
     * Create journey without dependencies.
     * @param {string} journeyId journey id/name
     * @returns {Promise<TreeSkeleton>} a promise that resolves to a journey object
     */
    createJourney(journeyId: string, journeyData: TreeSkeleton): Promise<TreeSkeleton>;
    /**
     * Update journey without dependencies.
     * @param {string} journeyId journey id/name
     * @returns {Promise<TreeSkeleton>} a promise that resolves to a journey object
     */
    updateJourney(journeyId: string, journeyData: TreeSkeleton): Promise<TreeSkeleton>;
    /**
     * Import journey
     * @param {SingleTreeExportInterface} treeObject tree object containing tree and all its dependencies
     * @param {TreeImportOptions} options import options
     * @returns {Promise<TreeSkeleton>} a promise that resolves to a journey object
     */
    importJourney(treeObject: SingleTreeExportInterface, options: TreeImportOptions): Promise<TreeSkeleton>;
    /**
     * Resolve journey dependencies
     * @param {string[]} installedJorneys Map of installed journeys
     * @param {Record<string, SingleTreeExportInterface>} journeyMap Map of journeys to resolve dependencies for
     * @param {string[]} unresolvedJourneys Map to hold the names of unresolved journeys and their dependencies
     * @param {string[]} resolvedJourneys Array to hold the names of resolved journeys
     * @param {int} index Depth of recursion
     */
    resolveDependencies(installedJorneys: any, journeyMap: any, unresolvedJourneys: any, resolvedJourneys: any, index?: number): Promise<void>;
    /**
     * Import journeys
     * @param {MultiTreeExportInterface} importData map of trees object
     * @param {TreeImportOptions} options import options
     */
    importJourneys(importData: MultiTreeExportInterface, options: TreeImportOptions): Promise<TreeSkeleton[]>;
    /**
     * Get the node reference obbject for a node object. Node reference objects
     * are used in a tree flow definition and within page nodes to reference
     * nodes. Among other things, node references contain all the non-configuration
     * meta data that exists for readaility, like the x/y coordinates of the node
     * and the display name chosen by the tree designer. The dislay name is the
     * only intuitive link between the graphical representation of the tree and
     * the node configurations that make up the tree.
     * @param nodeObj node object to retrieve the node reference object for
     * @param singleTreeExport tree export with or without dependencies
     * @returns {NodeRefSkeletonInterface | InnerNodeRefSkeletonInterface} node reference object
     */
    getNodeRef(nodeObj: NodeSkeleton, singleTreeExport: SingleTreeExportInterface): NodeRefSkeletonInterface | InnerNodeRefSkeletonInterface;
    /**
     * Default tree export resolver used to resolve a tree id/name to a full export
     * w/o dependencies of that tree from a platform instance.
     * @param {string} treeId id/name of the tree to resolve
     * @returns {TreeExportResolverInterface} tree export
     */
    onlineTreeExportResolver: TreeExportResolverInterface;
    /**
     * Tree export resolver used to resolve a tree id/name to a full export
     * of that tree from individual `treename.journey.json` export files.
     * @param {string} treeId id/name of the tree to resolve
     * @returns {TreeExportResolverInterface} tree export
     */
    fileByIdTreeExportResolver: TreeExportResolverInterface;
    /**
     * Factory that creates a tree export resolver used to resolve a tree id
     * to a full export of that tree from a multi-tree export file.
     * @param {string} file multi-tree export file
     * @returns {TreeExportResolverInterface} tree export resolver
     */
    createFileParamTreeExportResolver(file: string): TreeExportResolverInterface;
    /**
     * Get tree dependencies (all descendent inner trees)
     * @param {SingleTreeExportInterface} treeExport single tree export
     * @param {string[]} resolvedTreeIds list of tree ids wich have already been resolved
     * @param {TreeExportResolverInterface} resolveTreeExport tree export resolver callback function
     * @returns {Promise<TreeDependencyMapInterface>} a promise that resolves to a tree dependency map
     */
    getTreeDescendents(treeExport: SingleTreeExportInterface, resolveTreeExport: TreeExportResolverInterface, resolvedTreeIds?: string[]): Promise<TreeDependencyMapInterface>;
    /**
     * Analyze if a journey contains any custom nodes considering the detected or the overridden version.
     * @param {SingleTreeExportInterface} journey Journey/tree configuration object
     * @returns {boolean} True if the journey/tree contains any custom nodes, false otherwise.
     */
    isCustomJourney(journey: SingleTreeExportInterface): boolean;
    /**
     * Analyze if a journey contains any premium nodes considering the detected or the overridden version.
     * @param {SingleTreeExportInterface} journey Journey/tree configuration object
     * @returns {boolean} True if the journey/tree contains any custom nodes, false otherwise.
     */
    isPremiumJourney(journey: SingleTreeExportInterface): boolean;
    /**
     * Analyze if a journey contains any cloud-only nodes considering the detected or the overridden version.
     * @param {SingleTreeExportInterface} journey Journey/tree configuration object
     * @returns {boolean} True if the journey/tree contains any cloud-only nodes, false otherwise.
     */
    isCloudOnlyJourney(journey: SingleTreeExportInterface): boolean;
    /**
     * Get a journey's classifications, which can be one or multiple of:
     * - standard: can run on any instance of a ForgeRock platform
     * - cloud: utilize nodes, which are exclusively available in the ForgeRock Identity Cloud
     * - premium: utilizes nodes, which come at a premium
     * - custom: utilizes nodes not included in the ForgeRock platform release
     * @param {SingleTreeExportInterface} journey journey export data
     * @returns {JourneyClassificationType[]} an array of one or multiple classifications
     */
    getJourneyClassification(journey: SingleTreeExportInterface): JourneyClassificationType[];
    /**
     * Delete a journey
     * @param {string} journeyId journey id/name
     * @param {Object} options deep=true also delete all the nodes and inner nodes, verbose=true print verbose info
     */
    deleteJourney(journeyId: string, options: {
        deep: boolean;
        verbose: boolean;
        progress?: boolean;
    }): Promise<DeleteJourneyStatus>;
    /**
     * Delete all journeys
     * @param {Object} options deep=true also delete all the nodes and inner nodes, verbose=true print verbose info
     */
    deleteJourneys(options: {
        deep: boolean;
        verbose: boolean;
    }): Promise<DeleteJourneysStatus>;
    /**
     * Enable a journey
     * @param journeyId journey id/name
     * @returns {Promise<TreeSkeleton>} the updated tree/journey object
     */
    enableJourney(journeyId: string): Promise<TreeSkeleton>;
    /**
     * Disable a journey
     * @param journeyId journey id/name
     * @returns {Promise<TreeSkeleton>} the updated tree/journey object
     */
    disableJourney(journeyId: string): Promise<TreeSkeleton>;
    /**
     * Get all the journeys/trees without all their nodes and dependencies.
     * @returns {Promise<TreeSkeleton[]>} a promise that resolves to an array of journey objects
     * @deprecated since v2.0.0 use {@link Journey.readJourneys | readJourneys} instead
     * ```javascript
     * readJourneys(): Promise<TreeSkeleton[]>
     * ```
     * @group Deprecated
     */
    getJourneys(): Promise<TreeSkeleton[]>;
    /**
     * Get a journey/tree without all its nodes and dependencies.
     * @param {string} journeyId journey id/name
     * @returns {Promise<TreeSkeleton>} a promise that resolves to a journey object
     * @deprecated since v2.0.0 use {@link Journey.readJourney | readJourney} instead
     * ```javascript
     * readJourney(journeyId: string): Promise<TreeSkeleton>
     * ```
     * @group Deprecated
     */
    getJourney(journeyId: string): Promise<TreeSkeleton>;
    /**
     * Import journeys
     * @param {MultiTreeExportInterface} importData map of trees object
     * @param {TreeImportOptions} options import options
     * @deprecated since v2.0.0 use {@link Journey.importJourneys | importJourneys} instead
     * ```javascript
     * importJourneys(importData: MultiTreeExportInterface, options: TreeImportOptions): Promise<TreeSkeleton[]>
     * ```
     * @group Deprecated
     */
    importAllJourneys(importData: MultiTreeExportInterface, options: TreeImportOptions): Promise<TreeSkeleton[]>;
    /**
     * Find all node configuration objects that are no longer referenced by any tree
     * @returns {Promise<NodeSkeleton[]>} a promise that resolves to an array of orphaned nodes
     * @deprecated since v2.0.0 use {@link Node.findOrphanedNodes | findOrphanedNodes} in the {@link Node} module instead
     * @group Deprecated
     */
    findOrphanedNodes(): Promise<NodeSkeleton[]>;
    /**
     * Remove orphaned nodes
     * @param {NodeSkeleton[]} orphanedNodes Pass in an array of orphaned node configuration objects to remove
     * @returns {Promise<NodeSkeleton[]>} a promise that resolves to an array nodes that encountered errors deleting
     * @deprecated since v2.0.0 use {@link Node.removeOrphanedNodes | removeOrphanedNodes} in the {@link Node} module instead
     * @group Deprecated
     */
    removeOrphanedNodes(orphanedNodes: NodeSkeleton[]): Promise<NodeSkeleton[]>;
};
/**
 * Tree export options
 */
interface TreeExportOptions {
    /**
     * Where applicable, use string arrays to store multi-line text (e.g. scripts).
     */
    useStringArrays: boolean;
    /**
     * Include any dependencies (scripts, email templates, SAML entity providers and circles of trust, social identity providers, themes).
     */
    deps: boolean;
    /**
     * Include x and y coordinate positions of the journey/tree nodes.
     */
    coords: boolean;
}
/**
 * Tree import options
 */
interface TreeImportOptions {
    /**
     * Generate new UUIDs for all nodes during import.
     */
    reUuid: boolean;
    /**
     * Include any dependencies (scripts, email templates, SAML entity providers and circles of trust, social identity providers, themes).
     */
    deps: boolean;
}
interface SingleTreeExportInterface {
    meta?: ExportMetaData;
    innerNodes?: Record<string, NodeSkeleton>;
    innernodes?: Record<string, NodeSkeleton>;
    nodes: Record<string, NodeSkeleton>;
    scripts: Record<string, ScriptSkeleton>;
    emailTemplates: Record<string, EmailTemplateSkeleton>;
    socialIdentityProviders: Record<string, SocialIdpSkeleton>;
    themes: ThemeSkeleton[];
    saml2Entities: Record<string, Saml2ProviderSkeleton>;
    circlesOfTrust: Record<string, CircleOfTrustSkeleton>;
    tree: TreeSkeleton;
}
interface MultiTreeExportInterface {
    meta?: ExportMetaData;
    trees: Record<string, SingleTreeExportInterface>;
}
type JourneyClassificationType = 'standard' | 'custom' | 'cloud' | 'premium';
interface TreeDependencyMapInterface {
    [k: string]: TreeDependencyMapInterface[];
}
interface TreeExportResolverInterface {
    (treeId: string, state: State): Promise<SingleTreeExportInterface>;
}
type DeleteJourneyStatus = {
    status: string;
    nodes: {
        status?: string;
    };
};
type DeleteJourneysStatus = {
    [k: string]: DeleteJourneyStatus;
};

type Config = {
    /**
     * Export full configuration
     * @param {FullExportOptions} options export options
     * @param {Error[]} collectErrors optional parameters to collect erros instead of having the function throw. Pass an empty array to collect errors and report on them but have the function perform all it can and return the export data even if it encounters errors.
     * @returns {Promise<IdObjectSkeletonInterface>} a promise resolving to a full export object
     */
    exportFullConfiguration(options: FullExportOptions, collectErrors?: Error[]): Promise<FullExportInterface>;
    /**
     * Import full configuration
     * @param {FullExportInterface} importData import data
     * @param {FullImportOptions} options import options
     * @param {Error[]} collectErrors optional parameters to collect erros instead of having the function throw. Pass an empty array to collect errors and report on them but have the function perform all it can and return the export data even if it encounters errors.
     */
    importFullConfiguration(importData: FullExportInterface, options: FullImportOptions, collectErrors?: Error[]): Promise<void>;
};
/**
 * Full export options
 */
interface FullExportOptions {
    /**
     * Use string arrays to store multi-line text in scripts.
     */
    useStringArrays: boolean;
    /**
     * Do not include decoded variable value in export
     */
    noDecode: boolean;
    /**
     * Include x and y coordinate positions of the journey/tree nodes.
     */
    coords: boolean;
    /**
     * Include default scripts in export if true
     */
    includeDefault: boolean;
}
/**
 * Full import options
 */
interface FullImportOptions {
    /**
     * Generate new UUIDs for all journey nodes during import.
     */
    reUuidJourneys: boolean;
    /**
     * Generate new UUIDs for all scripts during import.
     */
    reUuidScripts: boolean;
    /**
     * Indicates whether to remove previously existing services of the same id before importing
     */
    cleanServices: boolean;
    /**
     * Indicates whether to import service(s) as global services
     */
    global: boolean;
    /**
     * Indicates whether to import service(s) to the current realm
     */
    realm: boolean;
    /**
     * Include default scripts in import if true
     */
    includeDefault: boolean;
}
interface FullExportInterface {
    meta?: ExportMetaData;
    agents: Record<string, AgentSkeleton> | undefined;
    application: Record<string, OAuth2ClientSkeleton> | undefined;
    authentication: AuthenticationSettingsSkeleton | undefined;
    config: Record<string, IdObjectSkeletonInterface> | undefined;
    emailTemplate: Record<string, EmailTemplateSkeleton> | undefined;
    idp: Record<string, SocialIdpSkeleton> | undefined;
    managedApplication: Record<string, ApplicationSkeleton> | undefined;
    policy: Record<string, PolicySkeleton> | undefined;
    policyset: Record<string, PolicySetSkeleton> | undefined;
    resourcetype: Record<string, ResourceTypeSkeleton> | undefined;
    saml: {
        hosted: Record<string, Saml2ProviderSkeleton>;
        remote: Record<string, Saml2ProviderSkeleton>;
        metadata: Record<string, string[]>;
        cot: Record<string, CircleOfTrustSkeleton> | undefined;
    } | undefined;
    script: Record<string, ScriptSkeleton> | undefined;
    secrets: Record<string, SecretSkeleton> | undefined;
    service: Record<string, AmServiceSkeleton> | undefined;
    theme: Record<string, ThemeSkeleton> | undefined;
    trees: Record<string, SingleTreeExportInterface> | undefined;
    variables: Record<string, VariableSkeleton> | undefined;
}

type ConnectionProfile = {
    /**
     * Get connection profiles file name
     * @returns {string} connection profiles file name
     */
    getConnectionProfilesPath(): string;
    /**
     * Find connection profiles
     * @param {ConnectionsFileInterface} connectionProfiles connection profile object
     * @param {string} host host url or unique substring
     * @returns {SecureConnectionProfileInterface[]} Array of connection profiles
     */
    findConnectionProfiles(connectionProfiles: ConnectionsFileInterface, host: string): SecureConnectionProfileInterface[];
    /**
     * Initialize connection profiles
     *
     * This method is called from app.ts and runs before any of the message handlers are registered.
     * Therefore none of the Console message functions will produce any output.
     */
    initConnectionProfiles(): Promise<void>;
    /**
     * Get connection profile by host
     * @param {String} host host tenant host url or unique substring
     * @returns {Object} connection profile or null
     */
    getConnectionProfileByHost(host: string): Promise<ConnectionProfileInterface>;
    /**
     * Get connection profile
     * @returns {Object} connection profile or null
     */
    getConnectionProfile(): Promise<ConnectionProfileInterface>;
    /**
     * Save connection profile
     * @param {string} host host url for new profiles or unique substring for existing profiles
     * @returns {Promise<boolean>} true if the operation succeeded, false otherwise
     */
    saveConnectionProfile(host: string): Promise<boolean>;
    /**
     * Delete connection profile
     * @param {string} host host tenant host url or unique substring
     */
    deleteConnectionProfile(host: string): void;
    /**
     * Create a new service account using auto-generated parameters
     * @returns {Promise<IdObjectSkeletonInterface>} A promise resolving to a service account object
     */
    addNewServiceAccount(): Promise<IdObjectSkeletonInterface>;
};
interface SecureConnectionProfileInterface {
    tenant: string;
    deploymentType?: string;
    username?: string | null;
    encodedPassword?: string | null;
    logApiKey?: string | null;
    encodedLogApiSecret?: string | null;
    authenticationService?: string | null;
    authenticationHeaderOverrides?: Record<string, string>;
    svcacctId?: string | null;
    encodedSvcacctJwk?: string | null;
    svcacctName?: string | null;
    svcacctScope?: string | null;
}
interface ConnectionProfileInterface {
    tenant: string;
    deploymentType?: string;
    username?: string | null;
    password?: string | null;
    logApiKey?: string | null;
    logApiSecret?: string | null;
    authenticationService?: string | null;
    authenticationHeaderOverrides?: Record<string, string>;
    svcacctId?: string | null;
    svcacctJwk?: JwkRsa;
    svcacctName?: string | null;
    svcacctScope?: string | null;
}
interface ConnectionsFileInterface {
    [key: string]: SecureConnectionProfileInterface;
}

type IdmConfigStub = IdObjectSkeletonInterface & {
    _id: string;
    pid: string;
    factoryPid: string | null;
};

interface ConnectorServerStatusInterface {
    name: string;
    type: string;
    ok: boolean;
}
interface SystemStatusInterface {
    name: string;
    enabled: boolean;
    config: string;
    connectorRef: {
        connectorHostRef: string;
        bundleVersion: string;
        bundleName: string;
        connectorName: string;
    };
    displayName: string;
    objectTypes: string[];
    ok: boolean;
}
interface SystemObjectPatchOperationInterface {
    operation: 'add' | 'copy' | 'increment' | 'move' | 'remove' | 'replace' | 'transform';
    field: string;
    value?: any;
    from?: string;
}

type IdmConfig = {
    /**
     * Read available config entity types
     * @returns {string[]} promise resolving to an array of config entity types
     */
    readConfigEntityTypes(): Promise<string[]>;
    /**
     * Read all config entity stubs. For full entities use {@link IdmConfig.readConfigEntities | readConfigEntities}.
     * @returns {IdmConfigStub[]} promise resolving to an array of config entity stubs
     */
    readConfigEntityStubs(): Promise<IdmConfigStub[]>;
    /**
     * Read all config entities
     * @returns {IdObjectSkeletonInterface[]} promise reolving to an array of config entities
     */
    readConfigEntities(): Promise<IdObjectSkeletonInterface[]>;
    /**
     * Read all config entities of a type
     * @param {string} type config entity type
     * @returns {IdObjectSkeletonInterface[]} promise resolving to an array of config entities of a type
     */
    readConfigEntitiesByType(type: string): Promise<IdObjectSkeletonInterface[]>;
    /**
     * Read config entity
     * @param {string} entityId config entity id/name
     * @returns {IdObjectSkeletonInterface} promise resolving to a config entity
     */
    readConfigEntity(entityId: string): Promise<IdObjectSkeletonInterface>;
    /**
     * Export all IDM config entities
     * @returns {ConfigEntityExportInterface} promise resolving to a ConfigEntityExportInterface object
     */
    exportConfigEntities(): Promise<ConfigEntityExportInterface>;
    /**
     * Create config entity
     * @param {string} entityId config entity id/name
     * @param {IdObjectSkeletonInterface} entityData config entity data
     * @returns {IdObjectSkeletonInterface} promise resolving to a config entity
     */
    createConfigEntity(entityId: string, entityData: IdObjectSkeletonInterface): Promise<IdObjectSkeletonInterface>;
    /**
     * Update or create config entity
     * @param {string} entityId config entity id/name
     * @param {IdObjectSkeletonInterface} entityData config entity data
     * @returns {IdObjectSkeletonInterface} promise resolving to a config entity
     */
    updateConfigEntity(entityId: string, entityData: IdObjectSkeletonInterface): Promise<IdObjectSkeletonInterface>;
    /**
     * Import idm config entities.
     * @param {ConfigEntityExportInterface} importData idm config entity import data.
     * @param {ConfigEntityImportOptions} options import options
     * @returns {Promise<IdObjectSkeletonInterface[]>} a promise resolving to an array of config entity objects
     */
    importConfigEntities(importData: ConfigEntityExportInterface, options: ConfigEntityImportOptions): Promise<IdObjectSkeletonInterface[]>;
    /**
     * Delete all config entities
     * @returns {IdObjectSkeletonInterface[]} promise reolving to an array of config entities
     */
    deleteConfigEntities(): Promise<IdObjectSkeletonInterface[]>;
    /**
     * Delete all config entities of a type
     * @param {string} type config entity type
     * @returns {IdObjectSkeletonInterface[]} promise resolving to an array of config entities of a type
     */
    deleteConfigEntitiesByType(type: string): Promise<IdObjectSkeletonInterface[]>;
    /**
     * Delete config entity
     * @param {string} entityId config entity id/name
     * @returns {IdObjectSkeletonInterface} promise resolving to a config entity
     */
    deleteConfigEntity(entityId: string): Promise<IdObjectSkeletonInterface>;
    /**
     * Get available config entity types
     * @returns {string[]} promise resolving to an array of config entity types
     * @deprecated since v2.0.0 use {@link IdmConfig.readConfigEntityTypes | readConfigEntityTypes} instead
     * ```javascript
     * readConfigEntityTypes(): Promise<string[]>
     * ```
     * @group Deprecated
     */
    getConfigEntityTypes(): Promise<string[]>;
    /**
     * Get all config entities
     * @returns {IdObjectSkeletonInterface[]} promise reolving to an array of config entities
     * @deprecated since v2.0.0 use {@link IdmConfig.readConfigEntities | readConfigEntities} instead
     * ```javascript
     * readConfigEntities(): Promise<IdObjectSkeletonInterface[]>
     * ```
     * @group Deprecated
     */
    getAllConfigEntities(): Promise<IdmConfigStub[]>;
    /**
     * Get all config entities of a type
     * @param {string} type config entity type
     * @returns {IdObjectSkeletonInterface[]} promise resolving to an array of config entities of a type
     * @deprecated since v2.0.0 use {@link IdmConfig.readConfigEntitiesByType | readConfigEntitiesByType} instead
     * ```javascript
     * readConfigEntitiesByType(type: string): Promise<IdObjectSkeletonInterface[]>
     * ```
     * @group Deprecated
     */
    getConfigEntitiesByType(type: string): Promise<IdObjectSkeletonInterface[]>;
    /**
     * Get config entity
     * @param {string} entityId config entity id/name
     * @returns {IdObjectSkeletonInterface} promise resolving to a config entity
     * @deprecated since v2.0.0 use {@link IdmConfig.readConfigEntity | readConfigEntity} instead
     * ```javascript
     * readConfigEntity(entityId: string): Promise<IdObjectSkeletonInterface>
     * ```
     * @group Deprecated
     */
    getConfigEntity(entityId: string): Promise<IdObjectSkeletonInterface>;
    /**
     * Put config entity
     * @param {string} entityId config entity id/name
     * @param {IdObjectSkeletonInterface} entityData config entity data
     * @returns {IdObjectSkeletonInterface} promise resolving to a config entity
     * @deprecated since v2.0.0 use {@link IdmConfig.updateConfigEntity | updateConfigEntity} or {@link IdmConfig.createConfigEntity | createConfigEntity} instead
     * ```javascript
     * updateConfigEntity(entityId: string, entityData: IdObjectSkeletonInterface): Promise<IdObjectSkeletonInterface>
     * createConfigEntity(entityId: string, entityData: IdObjectSkeletonInterface): Promise<IdObjectSkeletonInterface>
     * ```
     * @group Deprecated
     */
    putConfigEntity(entityId: string, entityData: IdObjectSkeletonInterface): Promise<IdObjectSkeletonInterface>;
    /**
     * Test connector servers
     * @deprecated since v2.0.0-42 use {@link IdmSystem.testConnectorServers | testConnectorServers} or {@link IdmSystem.testConnectorServers | testConnectorServers} instead
     * @returns {Promise<ConnectorServerStatusInterface[]>} a promise that resolves to an array of ConnectorServerStatusInterface objects
     */
    testConnectorServers(): Promise<ConnectorServerStatusInterface[]>;
};
/**
 * Config entity import options
 */
interface ConfigEntityImportOptions {
    /**
     * validate script hooks
     */
    validate: boolean;
}
interface ConfigEntityExportInterface {
    meta?: ExportMetaData;
    config: Record<string, IdObjectSkeletonInterface>;
}

type IdmSystem = {
    /**
     * Test connector servers
     * @returns {Promise<ConnectorServerStatusInterface[]>} a promise that resolves to an array of ConnectorServerStatusInterface objects
     */
    testConnectorServers(): Promise<ConnectorServerStatusInterface[]>;
    /**
     * Read available systems/connectors status
     * @returns {Promise<SystemStatusInterface[]>} a promise resolving to an array of system status objects
     */
    readAvailableSystems(): Promise<SystemStatusInterface[]>;
    /**
     * Read system/connector status
     * @returns {Promise<SystemStatusInterface>} a promise resolving to a system status object
     */
    readSystemStatus(systemName: string): Promise<SystemStatusInterface>;
    /**
     * Authenticate a system object using username and password (pass-through authentication)
     * @param {string} systemName name of system/connector
     * @param {string} systemObjectType type of system object
     * @param {string} username system object username
     * @param {string} password system object password
     * @returns {Promise<IdObjectSkeletonInterface>} a promise resolving to an IdObjectSkeletonInterface object containing only the _id
     */
    authenticateSystemObject(systemName: string, systemObjectType: string, username: string, password: string): Promise<IdObjectSkeletonInterface>;
    /**
     * Run system script
     * @param {string} systemName name of system/connector
     * @param {string} scriptName name of script
     * @returns {Promise<any>} a promise resolving to a status object
     */
    runSystemScript(systemName: string, scriptName: string): Promise<any>;
    /**
     * Query all system object ids
     * @param {string} systemName name of system/connector
     * @param {string} systemObjectType type of system object
     * @param {number} pageSize page size (default value: 1000)
     * @param {string} pageCookie paged results cookie
     * @returns {Promise<PagedResult<IdObjectSkeletonInterface>>} a promise resolving to an array of IdObjectSkeletonInterface objects
     */
    queryAllSystemObjectIds(systemName: string, systemObjectType: string, pageSize?: number, pageCookie?: string): Promise<PagedResult<IdObjectSkeletonInterface>>;
    /**
     * Query system objects using a search filter
     * @param {string} systemName name of system/connector
     * @param {string} systemObjectType type of system object
     * @param {string} filter search filter
     * @param {string[]} fields array of fields to return
     * @param {number} pageSize page size (default value: 1000)
     * @param {string} pageCookie paged results cookie
     * @returns {Promise<PagedResult<IdObjectSkeletonInterface>>} a promise resolving to an array of IdObjectSkeletonInterface objects
     */
    querySystemObjects(systemName: string, systemObjectType: string, filter: string, fields?: string[], pageSize?: number, pageCookie?: string): Promise<PagedResult<IdObjectSkeletonInterface>>;
    /**
     * Read system object
     * @param {string} systemName name of system/connector
     * @param {string} systemObjectType type of system object
     * @param {string} systemObjectId id of system object
     * @param {string[]} fields array of fields to return (default: `['*']`)
     * @returns {Promise<IdObjectSkeletonInterface>} a promise resolving to an IdObjectSkeletonInterface object
     */
    readSystemObject(systemName: string, systemObjectType: string, systemObjectId: string, fields?: string[]): Promise<IdObjectSkeletonInterface>;
    /**
     * Create system object
     * @param {string} systemName name of system/connector
     * @param {string} systemObjectType type of system object
     * @param {IdObjectSkeletonInterface} systemObjectData system object data
     * @returns {Promise<IdObjectSkeletonInterface>} a promise resolving to an IdObjectSkeletonInterface object
     */
    createSystemObject(systemName: string, systemObjectType: string, systemObjectData: IdObjectSkeletonInterface): Promise<IdObjectSkeletonInterface>;
    /**
     * Update or create system object
     * @param {string} systemName name of system/connector
     * @param {string} systemObjectType type of system object
     * @param {string} systemObjectId id of system object
     * @param {IdObjectSkeletonInterface} systemObjectData system object data
     * @param {boolean} failIfExists fail if object exists (default value: false)
     * @returns {Promise<IdObjectSkeletonInterface>} a promise resolving to an IdObjectSkeletonInterface object
     */
    updateSystemObject(systemName: string, systemObjectType: string, systemObjectId: string, systemObjectData: IdObjectSkeletonInterface, failIfExists?: boolean): Promise<IdObjectSkeletonInterface>;
    /**
     * Partially update system object through a collection of patch operations.
     * @param {string} systemName name of system/connector
     * @param {string} systemObjectType type of system object
     * @param {string} systemObjectId id of system object
     * @param {SystemObjectPatchOperationInterface[]} operations collection of patch operations to perform on the object
     * @returns {Promise<IdObjectSkeletonInterface>} a promise resolving to an IdObjectSkeletonInterface object
     */
    updateSystemObjectProperties(systemName: string, systemObjectType: string, systemObjectId: string, operations: SystemObjectPatchOperationInterface[]): Promise<IdObjectSkeletonInterface>;
    /**
     * Delete system object
     * @param {string} systemName name of system/connector
     * @param {string} systemObjectType type of system object
     * @param {string} systemObjectId id of system object
     * @returns {Promise<IdObjectSkeletonInterface>} a promise resolving to an IdObjectSkeletonInterface object
     */
    deleteSystemObject(systemName: string, systemObjectType: string, systemObjectId: string): Promise<IdObjectSkeletonInterface>;
    /**
     * Read system schema
     * @param {string} systemName name of system/connector
     * @returns {Promise<Record<string, ObjectTypeSkeleton>>} a promise resolving to a map of Record<string, ObjectTypeSkeleton>
     */
    readSystemSchema(systemName: string): Promise<Record<string, ObjectTypeSkeleton>>;
};

type Idp = {
    /**
     * Read all social identity providers
     * @returns {Promise<SocialIdpSkeleton[]>} a promise that resolves to an array of social identity providers
     */
    readSocialIdentityProviders(): Promise<SocialIdpSkeleton[]>;
    /**
     * Read social identity provider
     * @param {string} providerId identity provider id/name
     * @returns {Promise<SocialIdpSkeleton>} a promise that resolves a social identity provider object
     */
    readSocialIdentityProvider(providerId: string): Promise<SocialIdpSkeleton>;
    /**
     * Create social identity provider
     * @param {string} providerType identity provider type
     * @param {string} providerId identity provider id/name
     * @param {SocialIdpSkeleton} providerData identity provider data
     * @returns {Promise<SocialIdpSkeleton>} a promise that resolves a social identity provider object
     */
    createSocialIdentityProvider(providerType: string, providerId: string, providerData: SocialIdpSkeleton): Promise<SocialIdpSkeleton>;
    /**
     * Update or create social identity provider
     * @param {string} providerType identity provider type
     * @param {string} providerId identity provider id/name
     * @param {SocialIdpSkeleton} providerData identity provider data
     * @returns {Promise<SocialIdpSkeleton>} a promise that resolves a social identity provider object
     */
    updateSocialIdentityProvider(providerType: string, providerId: string, providerData: SocialIdpSkeleton): Promise<SocialIdpSkeleton>;
    /**
     * Delete all social identity providers
     * @returns {Promise<SocialIdpSkeleton[]>} a promise that resolves to an array of social identity provider objects
     */
    deleteSocialIdentityProviders(): Promise<SocialIdpSkeleton[]>;
    /**
     * Delete social identity provider
     * @param {string} providerId social identity provider id/name
     * @returns {Promise<SocialIdpSkeleton>} a promise that resolves a social identity provider object
     */
    deleteSocialIdentityProvider(providerId: string): Promise<SocialIdpSkeleton>;
    /**
     * Export social identity provider
     * @param {string} providerId provider id/name
     * @returns {Promise<SocialProviderExportInterface>} a promise that resolves to a SocialProviderExportInterface object
     */
    exportSocialIdentityProvider(providerId: string): Promise<SocialProviderExportInterface>;
    /**
     * Export all social identity providers
     * @param {SocialIdentityProviderExportOptions} options export options
     * @returns {Promise<SocialProviderExportInterface>} a promise that resolves to a SocialProviderExportInterface object
     */
    exportSocialIdentityProviders(options?: SocialIdentityProviderExportOptions): Promise<SocialProviderExportInterface>;
    /**
     * Import social identity provider
     * @param {string} providerId provider id/name
     * @param {SocialProviderExportInterface} importData import data
     * @param {SocialIdentityProviderImportOptions} options import options
     * @returns {Promise<SocialIdpSkeleton>} a promise resolving to a social identity provider object
     */
    importSocialIdentityProvider(providerId: string, importData: SocialProviderExportInterface, options: SocialIdentityProviderImportOptions): Promise<SocialIdpSkeleton>;
    /**
     * Import first social identity provider
     * @param {SocialProviderExportInterface} importData import data
     * @param {SocialIdentityProviderImportOptions} options import options
     * @returns {Promise<SocialIdpSkeleton>} a promise resolving to a social identity provider object
     */
    importFirstSocialIdentityProvider(importData: SocialProviderExportInterface, options: SocialIdentityProviderImportOptions): Promise<SocialIdpSkeleton>;
    /**
     * Import all social identity providers
     * @param {SocialProviderExportInterface} importData import data
     * @param {SocialIdentityProviderImportOptions} options import options
     * @returns {Promise<SocialIdpSkeleton[]>} a promise resolving to an array of social identity provider objects
     */
    importSocialIdentityProviders(importData: SocialProviderExportInterface, options: SocialIdentityProviderImportOptions): Promise<SocialIdpSkeleton[]>;
    /**
     * Get all social identity providers
     * @returns {Promise<SocialIdpSkeleton[]>} a promise that resolves to an array of social identity providers
     * @deprecated since v2.0.0 use {@link Idp.readSocialIdentityProviders | readSocialIdentityProviders} instead
     * ```javascript
     * readSocialIdentityProviders(): Promise<SocialIdpSkeleton[]>
     * ```
     * @group Deprecated
     */
    getSocialIdentityProviders(): Promise<SocialIdpSkeleton[]>;
    /**
     * Get social identity provider by id
     * @param {string} providerId identity provider id/name
     * @returns {Promise<SocialIdpSkeleton>} a promise that resolves a social identity provider object
     * @deprecated since v2.0.0 use {@link Idp.readSocialIdentityProvider | readSocialIdentityProvider} instead
     * ```javascript
     * readSocialIdentityProvider(providerId: string): Promise<SocialIdpSkeleton>
     * ```
     * @group Deprecated
     */
    getSocialProvider(providerId: string): Promise<SocialIdpSkeleton>;
    /**
     * Update or create identity provider
     * @param {string} providerType identity provider type
     * @param {string} providerId identity provider id/name
     * @param {SocialIdpSkeleton} providerData identity provider data
     * @returns {Promise<SocialIdpSkeleton>} a promise that resolves a social identity provider object
     * @deprecated since v2.0.0 use {@link Idp.updateSocialIdentityProvider | updateSocialIdentityProvider} or {@link Idp.createSocialIdentityProvider | createSocialIdentityProvider} instead
     * ```javascript
     * updateSocialIdentityProvider(providerType: string, providerId: string, providerData: SocialIdpSkeleton): Promise<SocialIdpSkeleton>
     * createSocialIdentityProvider(providerType: string, providerId: string, providerData: SocialIdpSkeleton): Promise<SocialIdpSkeleton>
     * ```
     * @group Deprecated
     */
    putProviderByTypeAndId(providerType: string, providerId: string, providerData: SocialIdpSkeleton): Promise<SocialIdpSkeleton>;
    /**
     * Delete social identity provider
     * @param {string} providerId social identity provider id/name
     * @returns {Promise<SocialIdpSkeleton>} a promise that resolves to a social identity provider object
     * @deprecated since v2.0.0 use {@link Idp.deleteSocialIdentityProvider | deleteSocialIdentityProvider} instead
     * ```javascript
     * deleteSocialIdentityProvider(providerId: string): Promise<SocialIdpSkeleton>
     * ```
     * @group Deprecated
     */
    deleteSocialProvider(providerId: string): Promise<SocialIdpSkeleton>;
    /**
     * Export social identity provider
     * @param {string} providerId provider id/name
     * @returns {Promise<SocialProviderExportInterface>} a promise that resolves to a SocialProviderExportInterface object
     * @deprecated since v2.0.0 use {@link Idp.exportSocialIdentityProvider | exportSocialIdentityProvider} instead
     * ```javascript
     * exportSocialIdentityProvider(providerId: string): Promise<SocialProviderExportInterface>
     * ```
     * @group Deprecated
     */
    exportSocialProvider(providerId: string): Promise<SocialProviderExportInterface>;
    /**
     * Export all social identity providers
     * @returns {Promise<SocialProviderExportInterface>} a promise that resolves to a SocialProviderExportInterface object
     * @deprecated since v2.0.0 use {@link Idp.exportSocialIdentityProviders | exportSocialIdentityProviders} instead
     * ```javascript
     * exportSocialIdentityProviders(): Promise<SocialProviderExportInterface[]>
     * ```
     * @group Deprecated
     */
    exportSocialProviders(): Promise<SocialProviderExportInterface>;
    /**
     * Import social identity provider
     * @param {string} providerId provider id/name
     * @param {SocialProviderExportInterface} importData import data
     * @deprecated since v2.0.0 use {@link Idp.importSocialIdentityProvider | importSocialIdentityProvider} instead
     * ```javascript
     * importSocialIdentityProvider(providerId: string, importData: SocialProviderExportInterface): Promise<SocialIdpSkeleton>
     * ```
     * @group Deprecated
     */
    importSocialProvider(providerId: string, importData: SocialProviderExportInterface): Promise<boolean>;
    /**
     * Import first social identity provider
     * @param {SocialProviderExportInterface} importData import data
     * @deprecated since v2.0.0 use {@link Idp.importFirstSocialIdentityProvider | importFirstSocialIdentityProvider} instead
     * ```javascript
     * importFirstSocialIdentityProvider(importData: SocialProviderExportInterface): Promise<SocialIdpSkeleton>
     * ```
     * @group Deprecated
     */
    importFirstSocialProvider(importData: SocialProviderExportInterface): Promise<boolean>;
    /**
     * Import all social identity providers
     * @param {SocialProviderExportInterface} importData import data
     * @deprecated since v2.0.0 use {@link Idp.importFirstSocialIdentityProviders | importFirstSocialIdentityProviders} instead
     * ```javascript
     * importFirstSocialIdentityProviders(importData: SocialProviderExportInterface): Promise<SocialIdpSkeleton[]>
     * ```
     * @group Deprecated
     */
    importSocialProviders(importData: SocialProviderExportInterface): Promise<boolean>;
};
/**
 * Social identity provider export options
 */
interface SocialIdentityProviderExportOptions {
    /**
     * Use string arrays to store multi-line text in scripts.
     */
    useStringArrays: boolean;
    /**
     * Include any dependencies (scripts).
     */
    deps: boolean;
}
/**
 * Social identity provider import options
 */
interface SocialIdentityProviderImportOptions {
    /**
     * Include any dependencies (scripts).
     */
    deps: boolean;
}
interface SocialProviderExportInterface {
    meta?: ExportMetaData;
    script: Record<string, ScriptSkeleton>;
    idp: Record<string, SocialIdpSkeleton>;
}

interface EnvInfoInterface {
    immutable: boolean;
    locked: boolean;
    region: string;
    tier: string;
    warning_message_html: string;
    message_box_title: string;
    message_box_html: string;
    message_variant: string;
    config_promotion_done: boolean;
    placeholder_management: 'CUSTOMER' | 'SRE';
    placeholder_management_migration_date: string;
}

type Info = {
    /**
     * Get info about the platform instance
     * @returns {Promise<PlatformInfo>} a promise that resolves to a json blob with information about the instance and tokens
     */
    getInfo(): Promise<PlatformInfo>;
};
interface PlatformInfoInterface {
    host: string;
    authenticatedSubject: string;
    amVersion: string;
    cookieName: string;
    sessionToken: string;
    bearerToken?: string;
    deploymentType: string;
}
type PlatformInfo = PlatformInfoInterface & Partial<EnvInfoInterface>;

/**
 * See {@link https://backstage.forgerock.com/docs/idm/7/rest-api-reference/sec-about-crest.html#about-crest-patch}.
 */
interface ManagedObjectPatchOperationInterface {
    operation: 'add' | 'copy' | 'increment' | 'move' | 'remove' | 'replace' | 'transform';
    field: string;
    value?: any;
    from?: string;
}

type ManagedObject = {
    /**
     * Create managed object
     * @param {string} type managed object type, e.g. teammember or alpha_user
     * @param {IdObjectSkeletonInterface} moData managed object data
     * @param {string} id managed object _id
     */
    createManagedObject(type: string, moData: IdObjectSkeletonInterface, id?: string): Promise<IdObjectSkeletonInterface>;
    /**
     * Read managed object
     * @param {string} type managed object type, e.g. alpha_user or user
     * @param {string} id managed object id
     * @param {string[]} id array of fields to include
     * @returns {Promise<IdObjectSkeletonInterface>} a promise that resolves to an IdObjectSkeletonInterface
     */
    readManagedObject(type: string, id: string, fields: string[]): Promise<IdObjectSkeletonInterface>;
    /**
     * Read all managed object of the specified type
     * @param {string} type managed object type, e.g. alpha_user or user
     * @param {string[]} fields array of fields to return
     * @returns {Promise<IdObjectSkeletonInterface[]>} a promise that resolves to an array of IdObjectSkeletonInterfaces
     */
    readManagedObjects(type: string, fields: string[]): Promise<IdObjectSkeletonInterface[]>;
    /**
     * Update managed object
     * @param {string} type managed object type, e.g. alpha_user or user
     * @param {string} id managed object id
     * @param {IdObjectSkeletonInterface} moData managed object data
     * @returns {Promise<IdObjectSkeletonInterface>} a promise that resolves to an IdObjectSkeletonInterface
     */
    updateManagedObject(type: string, id: string, moData: IdObjectSkeletonInterface): Promise<IdObjectSkeletonInterface>;
    /**
     * Partially update managed object through a collection of patch operations.
     * @param {string} type managed object type, e.g. alpha_user or user
     * @param {string} id managed object id
     * @param {ManagedObjectPatchOperationInterface[]} operations collection of patch operations to perform on the object
     * @param {string} rev managed object revision
     * @returns {Promise<IdObjectSkeletonInterface>} a promise that resolves to an IdObjectSkeletonInterface
     */
    updateManagedObjectProperties(type: string, id: string, operations: ManagedObjectPatchOperationInterface[], rev?: string): Promise<IdObjectSkeletonInterface>;
    /**
     * Partially update multiple managed object through a collection of patch operations.
     * @param {string} type managed object type, e.g. alpha_user or user
     * @param {string} filter CREST search filter
     * @param {ManagedObjectPatchOperationInterface[]} operations collection of patch operations to perform on the object
     * @param {string} rev managed object revision
     * @param {number} pageSize page size
     * @returns {Promise<IdObjectSkeletonInterface>} a promise that resolves to an IdObjectSkeletonInterface
     */
    updateManagedObjectsProperties(type: string, filter: string, operations: ManagedObjectPatchOperationInterface[], rev?: string, pageSize?: number): Promise<IdObjectSkeletonInterface[]>;
    /**
     * Delete managed object
     * @param {string} type managed object type, e.g. alpha_user or user
     * @param {string} id managed object id
     * @returns {Promise<IdObjectSkeletonInterface>} a promise that resolves to an IdObjectSkeletonInterface
     */
    deleteManagedObject(type: string, id: string): Promise<IdObjectSkeletonInterface>;
    /**
     * Delete managed objects by filter
     * @param {string} type managed object type, e.g. alpha_user or user
     * @param {string} filter filter
     * @returns {Promise<number>} a promise that resolves the number of deleted objects
     */
    deleteManagedObjects(type: string, filter: string): Promise<number>;
    /**
     * Query managed objects
     * @param {string} type managed object type, e.g. alpha_user or user
     * @param {string} filter CREST search filter
     * @param {string[]} fields array of fields to return
     * @return {Promise<IdObjectSkeletonInterface[]>} a promise resolving to an array of managed objects
     */
    queryManagedObjects(type: string, filter?: string, fields?: string[], pageSize?: number): Promise<IdObjectSkeletonInterface[]>;
    /**
     * Resolve a managed object's uuid to a human readable username
     * @param {string} type managed object type, e.g. teammember or alpha_user
     * @param {string} id managed object _id
     * @returns {Promise<string>} resolved username or uuid if any error occurs during reslution
     */
    resolveUserName(type: string, id: string): Promise<string>;
    /**
     * Resolve a managed object's uuid to a human readable full name
     * @param {string} type managed object type, e.g. teammember or alpha_user
     * @param {string} id managed object _id
     * @returns {Promise<string>} resolved full name or uuid if any error occurs during reslution
     */
    resolveFullName(type: string, id: string): Promise<string>;
    /**
     * Resolve a perpetrator's uuid to a human readable string identifying the perpetrator
     * @param {string} id managed object _id
     * @returns {Promise<string>} resolved perpetrator descriptive string or uuid if any error occurs during reslution
     */
    resolvePerpetratorUuid(id: string): Promise<string>;
};

type Node = {
    /**
     * Read all node types
     * @returns {Promise<any>} a promise that resolves to an array of node type objects
     */
    readNodeTypes(): Promise<any>;
    /**
     * Read all nodes
     * @returns {Promise<NodeSkeleton[]>} a promise that resolves to an object containing an array of node objects
     */
    readNodes(): Promise<NodeSkeleton[]>;
    /**
     * Read all nodes by type
     * @param {string} nodeType node type
     * @returns {Promise<NodeSkeleton[]>} a promise that resolves to an object containing an array of node objects of the requested type
     */
    readNodesByType(nodeType: string): Promise<NodeSkeleton[]>;
    /**
     * Read node by uuid and type
     * @param {string} nodeId node uuid
     * @param {string} nodeType node type
     * @returns {Promise<NodeSkeleton>} a promise that resolves to a node object
     */
    readNode(nodeId: string, nodeType: string): Promise<NodeSkeleton>;
    /**
     * Create node by type
     * @param {string} nodeType node type
     * @param {NodeSkeleton} nodeData node object
     * @returns {Promise<NodeSkeleton>} a promise that resolves to an object containing a node object
     */
    createNode(nodeType: string, nodeData: NodeSkeleton): Promise<NodeSkeleton>;
    /**
     * Update or create node by uuid and type
     * @param {string} nodeId node uuid
     * @param {string} nodeType node type
     * @param {NodeSkeleton} nodeData node object
     * @returns {Promise<NodeSkeleton>} a promise that resolves to an object containing a node object
     */
    updateNode(nodeId: string, nodeType: string, nodeData: NodeSkeleton): Promise<NodeSkeleton>;
    /**
     * Delete node by uuid and type
     * @param {string} nodeId node uuid
     * @param {string} nodeType node type
     * @returns {Promise<NodeSkeleton>} a promise that resolves to an object containing a node object
     */
    deleteNode(nodeId: string, nodeType: string): Promise<NodeSkeleton>;
    /**
     * Find all node configuration objects that are no longer referenced by any tree
     * @returns {Promise<NodeSkeleton[]>} a promise that resolves to an array of orphaned nodes
     */
    findOrphanedNodes(): Promise<NodeSkeleton[]>;
    /**
     * Remove orphaned nodes
     * @param {NodeSkeleton[]} orphanedNodes Pass in an array of orphaned node configuration objects to remove
     * @returns {Promise<NodeSkeleton[]>} a promise that resolves to an array nodes that encountered errors deleting
     */
    removeOrphanedNodes(orphanedNodes: NodeSkeleton[]): Promise<NodeSkeleton[]>;
    /**
     * Analyze if a node type is premium.
     * @param {string} nodeType Node type
     * @returns {boolean} True if the node type is premium, false otherwise.
     */
    isPremiumNode(nodeType: string): boolean;
    /**
     * Analyze if a node type is a cloud-only node.
     * @param {string} nodeType Node type
     * @returns {boolean} True if the node type is cloud-only, false otherwise.
     */
    isCloudOnlyNode(nodeType: string): boolean;
    /**
     * Analyze if a node type is a cloud-excluded node. Cloud excluded nodes are OOTB nodes in self-hosted AM deployments but have been excluded in cloud.
     * @param {string} nodeType node type.
     * @returns {boolean} True if node type is cloud-excluded, false otherwise.
     */
    isCloudExcludedNode(nodeType: string): boolean;
    /**
     * Analyze if a node type has been deprecated
     * @param {string} nodeType node type.
     * @returns {boolean} True if node type is deprecated, false otherwise.
     */
    isDeprecatedNode(nodeType: string): boolean;
    /**
     * Analyze if a node is custom.
     * @param {string} nodeType Node type
     * @returns {boolean} True if the node type is custom, false otherwise.
     */
    isCustomNode(nodeType: string): boolean;
    /**
     * Get a node's classifications, which can be one or multiple of:
     * - standard: can run on any instance of a ForgeRock platform
     * - cloud: utilize nodes, which are exclusively available in the ForgeRock Identity Cloud
     * - premium: utilizes nodes, which come at a premium
     * @param {string} nodeType Node type
     * @returns {NodeClassificationType[]} an array of one or multiple classifications
     */
    getNodeClassification(nodeType: string): NodeClassificationType[];
};
type NodeClassificationType = 'standard' | 'custom' | 'cloud' | 'excluded' | 'premium' | 'deprecated';

type OAuth2Client = {
    /**
     * Create an empty OAuth2 client export template
     * @returns {OAuth2ClientExportInterface} an empty OAuth2 client export template
     */
    createOAuth2ClientExportTemplate(): OAuth2ClientExportInterface;
    /**
     * Read all OAuth2 clients
     * @returns {Promise<OAuth2ClientSkeleton[]>} a promise that resolves to an array of oauth2client objects
     */
    readOAuth2Clients(): Promise<OAuth2ClientSkeleton[]>;
    /**
     * Read OAuth2 client
     * @param {string} clientId client id
     * @returns {Promise<OAuth2ClientSkeleton>} a promise that resolves to an oauth2client object
     */
    readOAuth2Client(clientId: string): Promise<OAuth2ClientSkeleton>;
    /**
     * Create OAuth2 client
     * @param {string} clientId client id
     * @param {any} clientData oauth2client object
     * @returns {Promise<OAuth2ClientSkeleton>} a promise that resolves to an oauth2client object
     */
    createOAuth2Client(clientId: string, clientData: OAuth2ClientSkeleton): Promise<OAuth2ClientSkeleton>;
    /**
     * Update or create OAuth2 client
     * @param {string} clientId client id
     * @param {any} clientData oauth2client object
     * @returns {Promise<any>} a promise that resolves to an oauth2client object
     */
    updateOAuth2Client(clientId: string, clientData: OAuth2ClientSkeleton): Promise<OAuth2ClientSkeleton>;
    /**
     * Delete all OAuth2 clients
     * @returns {Promise<OAuth2ClientSkeleton[]>} a promise that resolves to an array of oauth2client objects
     */
    deleteOAuth2Clients(): Promise<OAuth2ClientSkeleton[]>;
    /**
     * Delete OAuth2 client
     * @param {string} clientId client id
     * @returns {Promise<OAuth2ClientSkeleton>} a promise that resolves to an oauth2client object
     */
    deleteOAuth2Client(clientId: string): Promise<OAuth2ClientSkeleton>;
    /**
     * Export all OAuth2 clients
     * @param {OAuth2ClientExportOptions} options export options
     * @returns {OAuth2ClientExportInterface} export data
     */
    exportOAuth2Clients(options?: OAuth2ClientExportOptions): Promise<OAuth2ClientExportInterface>;
    /**
     * Export OAuth2 client by ID
     * @param {string} clientId oauth2 client id
     * @param {OAuth2ClientExportOptions} options export options
     * @returns {OAuth2ClientExportInterface} export data
     */
    exportOAuth2Client(clientId: string, options?: OAuth2ClientExportOptions): Promise<OAuth2ClientExportInterface>;
    /**
     * Import OAuth2 Client by ID
     * @param {string} clientId client id
     * @param {OAuth2ClientExportInterface} importData import data
     * @param {OAuth2ClientImportOptions} options import options
     * @returns {Promise<OAuth2ClientSkeleton>} a promise resolving to an oauth2 client
     */
    importOAuth2Client(clientId: string, importData: OAuth2ClientExportInterface, options?: OAuth2ClientImportOptions): Promise<OAuth2ClientSkeleton>;
    /**
     * Import first OAuth2 Client
     * @param {OAuth2ClientExportInterface} importData import data
     * @param {OAuth2ClientImportOptions} options import options
     * @returns {Promise<OAuth2ClientSkeleton>} a promise resolving to an oauth2 client
     */
    importFirstOAuth2Client(importData: OAuth2ClientExportInterface, options?: OAuth2ClientImportOptions): Promise<OAuth2ClientSkeleton>;
    /**
     * Import OAuth2 Clients
     * @param {OAuth2ClientExportInterface} importData import data
     * @param {OAuth2ClientImportOptions} options import options
     * @returns {Promise<OAuth2ClientSkeleton[]>} a promise resolving to an array of oauth2 clients
     */
    importOAuth2Clients(importData: OAuth2ClientExportInterface, options?: OAuth2ClientImportOptions): Promise<OAuth2ClientSkeleton[]>;
    /**
     * Get all OAuth2 clients
     * @returns {Promise<OAuth2ClientSkeleton[]>} a promise that resolves to an array of oauth2client objects
     * @deprecated since v2.0.0 use {@link OAuth2Client.readOAuth2Clients | readOAuth2Clients} instead
     * ```javascript
     * readOAuth2Clients(): Promise<OAuth2ClientSkeleton[]>
     * ```
     * @group Deprecated
     */
    getOAuth2Clients(): Promise<OAuth2ClientSkeleton[]>;
    /**
     * Get OAuth2 client
     * @param {string} clientId client id
     * @returns {Promise<OAuth2ClientSkeleton>} a promise that resolves to an oauth2client object
     * @deprecated since v2.0.0 use {@link OAuth2Client.readOAuth2Client | readOAuth2Client} instead
     * ```javascript
     * readOAuth2Client(clientId: string): Promise<OAuth2ClientSkeleton>
     * ```
     * @group Deprecated
     */
    getOAuth2Client(clientId: string): Promise<OAuth2ClientSkeleton>;
    /**
     * Put OAuth2 client
     * @param {string} clientId client id
     * @param {OAuth2ClientSkeleton} clientData oauth2client object
     * @returns {Promise<any>} a promise that resolves to an oauth2client object
     * @deprecated since v2.0.0 use {@link OAuth2Client.updateOAuth2Client | updateOAuth2Client} or {@link OAuth2Client.createOAuth2Client | createOAuth2Client} instead
     * ```javascript
     * updateOAuth2Client(clientId: string, clientData: OAuth2ClientSkeleton): Promise<OAuth2ClientSkeleton>
     * createOAuth2Client(clientId: string, clientData: OAuth2ClientSkeleton): Promise<OAuth2ClientSkeleton>
     * ```
     * @group Deprecated
     */
    putOAuth2Client(clientId: string, clientData: OAuth2ClientSkeleton): Promise<OAuth2ClientSkeleton>;
};
/**
 * OAuth2 client export options
 */
interface OAuth2ClientExportOptions {
    /**
     * Use string arrays to store multi-line text in scripts.
     */
    useStringArrays: boolean;
    /**
     * Include any dependencies (scripts).
     */
    deps: boolean;
}
/**
 * OAuth2 client import options
 */
interface OAuth2ClientImportOptions {
    /**
     * Include any dependencies (scripts).
     */
    deps: boolean;
}
interface OAuth2ClientExportInterface {
    meta?: ExportMetaData;
    script?: Record<string, ScriptSkeleton>;
    application: Record<string, OAuth2ClientSkeleton>;
}

type OAuth2ProviderSkeleton = IdObjectSkeletonInterface & {
    advancedOIDCConfig: {
        supportedRequestParameterEncryptionEnc?: string[];
        authorisedOpenIdConnectSSOClients?: string[];
        supportedUserInfoEncryptionAlgorithms?: string[];
        supportedAuthorizationResponseEncryptionEnc?: string[];
        supportedTokenIntrospectionResponseEncryptionAlgorithms?: string[];
        useForceAuthnForPromptLogin?: boolean;
        useForceAuthnForMaxAge?: boolean;
        alwaysAddClaimsToToken?: boolean;
        supportedTokenIntrospectionResponseSigningAlgorithms?: string[];
        supportedTokenEndpointAuthenticationSigningAlgorithms?: string[];
        supportedRequestParameterSigningAlgorithms?: string[];
        includeAllKtyAlgCombinationsInJwksUri?: boolean;
        amrMappings?: any;
        loaMapping?: any;
        authorisedIdmDelegationClients?: string[];
        idTokenInfoClientAuthenticationEnabled?: boolean;
        storeOpsTokens?: boolean;
        supportedUserInfoSigningAlgorithms?: string[];
        supportedAuthorizationResponseSigningAlgorithms?: string[];
        supportedUserInfoEncryptionEnc?: string[];
        claimsParameterSupported?: boolean;
        supportedTokenIntrospectionResponseEncryptionEnc?: string[];
        supportedAuthorizationResponseEncryptionAlgorithms?: string[];
        supportedRequestParameterEncryptionAlgorithms?: string[];
        defaultACR?: string[];
        [k: string]: string | number | boolean | string[] | object | undefined;
    };
    advancedOAuth2Config?: {
        passwordGrantAuthService?: string;
        tokenCompressionEnabled?: boolean;
        tokenEncryptionEnabled?: boolean;
        requirePushedAuthorizationRequests?: boolean;
        tlsCertificateBoundAccessTokensEnabled?: boolean;
        defaultScopes?: string[];
        moduleMessageEnabledInPasswordGrant?: boolean;
        allowClientCredentialsInTokenRequestQueryParameters?: boolean;
        supportedSubjectTypes?: string[];
        refreshTokenGracePeriod?: number;
        tlsClientCertificateHeaderFormat?: string;
        hashSalt?: string;
        macaroonTokenFormat?: string;
        maxAgeOfRequestObjectNbfClaim?: number;
        tlsCertificateRevocationCheckingEnabled?: boolean;
        nbfClaimRequiredInRequestObject?: boolean;
        requestObjectProcessing?: string;
        maxDifferenceBetweenRequestObjectNbfAndExp?: number;
        responseTypeClasses?: string[];
        expClaimRequiredInRequestObject?: boolean;
        tokenValidatorClasses?: string[];
        tokenSigningAlgorithm?: string;
        codeVerifierEnforced?: string;
        displayNameAttribute?: string;
        tokenExchangeClasses?: string[];
        parRequestUriLifetime?: number;
        allowedAudienceValues?: string[];
        persistentClaims?: string[];
        supportedScopes?: string[];
        authenticationAttributes?: string[];
        grantTypes?: string[];
        [k: string]: string | number | boolean | string[] | object | undefined;
    };
    clientDynamicRegistrationConfig?: {
        dynamicClientRegistrationScope: string;
        allowDynamicRegistration: boolean;
        requiredSoftwareStatementAttestedAttributes: string[];
        dynamicClientRegistrationSoftwareStatementRequired: boolean;
        generateRegistrationAccessTokens: boolean;
        [k: string]: string | number | boolean | string[] | object | undefined;
    };
    coreOIDCConfig?: {
        overrideableOIDCClaims: string[];
        oidcDiscoveryEndpointEnabled: boolean;
        supportedIDTokenEncryptionMethods: string[];
        supportedClaims: string[];
        supportedIDTokenSigningAlgorithms: string[];
        supportedIDTokenEncryptionAlgorithms: string[];
        jwtTokenLifetime: number;
        [k: string]: string | number | boolean | string[] | object | undefined;
    };
    coreOAuth2Config?: {
        refreshTokenLifetime: number;
        scopesPolicySet: string;
        accessTokenMayActScript: '[Empty]' | string;
        accessTokenLifetime: number;
        macaroonTokensEnabled: boolean;
        codeLifetime: number;
        statelessTokensEnabled: boolean;
        usePolicyEngineForScope: boolean;
        issueRefreshToken: boolean;
        oidcMayActScript: '[Empty]' | string;
        issueRefreshTokenOnRefreshedToken: boolean;
        [k: string]: string | number | boolean | string[] | object | undefined;
    };
    consent?: {
        supportedRcsRequestSigningAlgorithms: string[];
        supportedRcsResponseEncryptionAlgorithms: string[];
        supportedRcsRequestEncryptionMethods: string[];
        enableRemoteConsent: boolean;
        supportedRcsRequestEncryptionAlgorithms: string[];
        clientsCanSkipConsent: boolean;
        supportedRcsResponseSigningAlgorithms: string[];
        supportedRcsResponseEncryptionMethods: string[];
        [k: string]: string | number | boolean | string[] | object | undefined;
    };
    deviceCodeConfig?: {
        deviceUserCodeLength: number;
        deviceCodeLifetime: number;
        deviceUserCodeCharacterSet: string;
        devicePollInterval: number;
        [k: string]: string | number | boolean | string[] | object | undefined;
    };
    pluginsConfig?: {
        evaluateScopeClass?: string;
        validateScopeScript?: '[Empty]' | string;
        accessTokenEnricherClass?: string;
        oidcClaimsPluginType?: string;
        authorizeEndpointDataProviderClass?: string;
        authorizeEndpointDataProviderPluginType?: 'JAVA' | 'SCRIPTED';
        userCodeGeneratorClass?: string;
        evaluateScopeScript?: '[Empty]' | string;
        oidcClaimsClass?: string;
        evaluateScopePluginType?: 'JAVA' | 'SCRIPTED';
        authorizeEndpointDataProviderScript?: '[Empty]' | string;
        accessTokenModifierClass?: string;
        accessTokenModificationScript?: '[Empty]' | string;
        validateScopePluginType?: 'JAVA' | 'SCRIPTED';
        accessTokenModificationPluginType?: 'JAVA' | 'SCRIPTED';
        oidcClaimsScript?: '[Empty]' | string;
        validateScopeClass?: string;
        [k: string]: string | number | boolean | string[] | object | undefined;
    };
    cibaConfig?: {
        cibaMinimumPollingInterval: number;
        supportedCibaSigningAlgorithms: string[];
        cibaAuthReqIdLifetime: number;
        [k: string]: string | number | boolean | string[] | object | undefined;
    };
    _type?: AmServiceType;
    [k: string]: string | number | boolean | string[] | object | undefined;
};

type OAuth2Provider = {
    /**
     * Read oauth2 provider
     * @returns {Promise<OAuth2ProviderSkeleton>} a promise resolving to an oauth2 provider object
     */
    readOAuth2Provider(): Promise<OAuth2ProviderSkeleton>;
    /**
     * Create oauth2 provider
     * @param {OAuth2ProviderSkeleton} providerData oauth2 provider data
     * @returns {Promise<OAuth2ProviderSkeleton>} a promise resolving to an oauth2 provider object
     */
    createOAuth2Provider(providerData?: OAuth2ProviderSkeleton): Promise<OAuth2ProviderSkeleton>;
    /**
     * Update or create oauth2 provider
     * @param {OAuth2ProviderSkeleton} providerData oauth2 provider data
     * @returns {Promise<OAuth2ProviderSkeleton>} a promise resolving to an oauth2 provider object
     */
    updateOAuth2Provider(providerData: OAuth2ProviderSkeleton): Promise<OAuth2ProviderSkeleton>;
    /**
     * Delete oauth2 provider
     * @returns {Promise<OAuth2ProviderSkeleton>} a promise resolving to an oauth2 provider object
     */
    deleteOAuth2Provider(): Promise<OAuth2ProviderSkeleton>;
    /**
     * Get oauth2 provider
     * @returns {Promise<OAuth2ProviderSkeleton>} a promise resolving to an oauth2 provider object
     * @deprecated since v2.0.0 use {@link OAuth2Provider.readOAuth2Provider | readOAuth2Provider} instead
     * ```javascript
     * importFirstSocialIdentityProvider(importData: SocialProviderExportInterface): Promise<SocialIdpSkeleton>
     * ```
     * @group Deprecated
     */
    getOAuth2Provider(): Promise<OAuth2ProviderSkeleton>;
};

type OAuth2TrustedJwtIssuer = {
    /**
     * Create an empty OAuth2 trusted jwt issuer export template
     * @returns {OAuth2TrustedJwtIssuerExportInterface} an empty OAuth2 trusted jwt issuer export template
     */
    createOAuth2TrustedJwtIssuerExportTemplate(): OAuth2TrustedJwtIssuerExportInterface;
    /**
     * Read all OAuth2 trusted jwt issuers
     * @returns {Promise<OAuth2TrustedJwtIssuerSkeleton[]>} a promise that resolves to an array of trusted jwt issuer objects
     */
    readOAuth2TrustedJwtIssuers(): Promise<OAuth2TrustedJwtIssuerSkeleton[]>;
    /**
     * Read OAuth2 trusted jwt issuer
     * @param {string} issuerId trusted jwt issuer id
     * @returns {Promise<OAuth2TrustedJwtIssuerSkeleton>} a promise that resolves to an trusted jwt issuer object
     */
    readOAuth2TrustedJwtIssuer(issuerId: string): Promise<OAuth2TrustedJwtIssuerSkeleton>;
    /**
     * Create OAuth2 trusted jwt issuer
     * @param {string} issuerId trusted jwt issuer id
     * @param {any} issuerData trusted jwt issuer object
     * @returns {Promise<OAuth2TrustedJwtIssuerSkeleton>} a promise that resolves to an trusted jwt issuer object
     */
    createOAuth2TrustedJwtIssuer(issuerId: string, issuerData: OAuth2TrustedJwtIssuerSkeleton): Promise<OAuth2TrustedJwtIssuerSkeleton>;
    /**
     * Update or create OAuth2 trusted jwt issuer
     * @param {string} issuerId trusted jwt issuer id
     * @param {any} issuerData trusted jwt issuer object
     * @returns {Promise<any>} a promise that resolves to an trusted jwt issuer object
     */
    updateOAuth2TrustedJwtIssuer(issuerId: string, issuerData: OAuth2TrustedJwtIssuerSkeleton): Promise<OAuth2TrustedJwtIssuerSkeleton>;
    /**
     * Delete all OAuth2 trusted jwt issuers
     * @returns {Promise<OAuth2TrustedJwtIssuerSkeleton[]>} a promise that resolves to an array of trusted jwt issuer objects
     */
    deleteOAuth2TrustedJwtIssuers(): Promise<OAuth2TrustedJwtIssuerSkeleton[]>;
    /**
     * Delete OAuth2 trusted jwt issuer
     * @param {string} issuerId trusted jwt issuer id
     * @returns {Promise<OAuth2TrustedJwtIssuerSkeleton>} a promise that resolves to an trusted jwt issuer object
     */
    deleteOAuth2TrustedJwtIssuer(issuerId: string): Promise<OAuth2TrustedJwtIssuerSkeleton>;
    /**
     * Export all OAuth2 trusted jwt issuers
     * @param {OAuth2TrustedJwtIssuerExportOptions} options export options
     * @returns {OAuth2TrustedJwtIssuerExportInterface} export data
     */
    exportOAuth2TrustedJwtIssuers(options?: OAuth2TrustedJwtIssuerExportOptions): Promise<OAuth2TrustedJwtIssuerExportInterface>;
    /**
     * Export OAuth2 trusted jwt issuer by ID
     * @param {string} issuerId oauth2 trusted jwt issuer id
     * @param {OAuth2TrustedJwtIssuerExportOptions} options export options
     * @returns {OAuth2TrustedJwtIssuerExportInterface} export data
     */
    exportOAuth2TrustedJwtIssuer(issuerId: string, options?: OAuth2TrustedJwtIssuerExportOptions): Promise<OAuth2TrustedJwtIssuerExportInterface>;
    /**
     * Import OAuth2 Client by ID
     * @param {string} issuerId trusted jwt issuer id
     * @param {OAuth2TrustedJwtIssuerExportInterface} importData import data
     * @param {OAuth2TrustedJwtIssuerImportOptions} options import options
     * @returns {Promise<OAuth2TrustedJwtIssuerSkeleton>} a promise resolving to an oauth2 trusted jwt issuer
     */
    importOAuth2TrustedJwtIssuer(issuerId: string, importData: OAuth2TrustedJwtIssuerExportInterface, options?: OAuth2TrustedJwtIssuerImportOptions): Promise<OAuth2TrustedJwtIssuerSkeleton>;
    /**
     * Import first OAuth2 Client
     * @param {OAuth2TrustedJwtIssuerExportInterface} importData import data
     * @param {OAuth2TrustedJwtIssuerImportOptions} options import options
     * @returns {Promise<OAuth2TrustedJwtIssuerSkeleton>} a promise resolving to an oauth2 trusted jwt issuer
     */
    importFirstOAuth2TrustedJwtIssuer(importData: OAuth2TrustedJwtIssuerExportInterface, options?: OAuth2TrustedJwtIssuerImportOptions): Promise<OAuth2TrustedJwtIssuerSkeleton>;
    /**
     * Import OAuth2 Clients
     * @param {OAuth2TrustedJwtIssuerExportInterface} importData import data
     * @param {OAuth2TrustedJwtIssuerImportOptions} options import options
     * @returns {Promise<OAuth2TrustedJwtIssuerSkeleton[]>} a promise resolving to an array of oauth2 trusted jwt issuers
     */
    importOAuth2TrustedJwtIssuers(importData: OAuth2TrustedJwtIssuerExportInterface, options?: OAuth2TrustedJwtIssuerImportOptions): Promise<OAuth2TrustedJwtIssuerSkeleton[]>;
    /**
     * Get all OAuth2 trusted jwt issuers
     * @returns {Promise<OAuth2TrustedJwtIssuerSkeleton[]>} a promise that resolves to an array of trusted jwt issuer objects
     * @deprecated since v2.0.0 use {@link OAuth2TrustedJwtIssuer.readOAuth2TrustedJwtIssuers | readOAuth2TrustedJwtIssuers} instead
     * ```javascript
     * readOAuth2TrustedJwtIssuers(): Promise<OAuth2TrustedJwtIssuerSkeleton[]>
     * ```
     * @group Deprecated
     */
    getOAuth2TrustedJwtIssuers(): Promise<OAuth2TrustedJwtIssuerSkeleton[]>;
    /**
     * Get OAuth2 trusted jwt issuer
     * @param {string} issuerId trusted jwt issuer id
     * @returns {Promise<OAuth2TrustedJwtIssuerSkeleton>} a promise that resolves to an trusted jwt issuer object
     * @deprecated since v2.0.0 use {@link OAuth2TrustedJwtIssuer.readOAuth2TrustedJwtIssuer | readOAuth2TrustedJwtIssuer} instead
     * ```javascript
     * readOAuth2TrustedJwtIssuer(issuerId: string): Promise<OAuth2TrustedJwtIssuerSkeleton>
     * ```
     * @group Deprecated
     */
    getOAuth2TrustedJwtIssuer(issuerId: string): Promise<OAuth2TrustedJwtIssuerSkeleton>;
    /**
     * Put OAuth2 trusted jwt issuer
     * @param {string} issuerId trusted jwt issuer id
     * @param {OAuth2TrustedJwtIssuerSkeleton} issuerData trusted jwt issuer object
     * @returns {Promise<any>} a promise that resolves to an trusted jwt issuer object
     * @deprecated since v2.0.0 use {@link OAuth2TrustedJwtIssuer.updateOAuth2TrustedJwtIssuer | updateOAuth2TrustedJwtIssuer} or {@link OAuth2TrustedJwtIssuer.createOAuth2TrustedJwtIssuer | createOAuth2TrustedJwtIssuer} instead
     * ```javascript
     * updateOAuth2TrustedJwtIssuer(issuerId: string, issuerData: OAuth2TrustedJwtIssuerSkeleton): Promise<OAuth2TrustedJwtIssuerSkeleton>
     * createOAuth2TrustedJwtIssuer(issuerId: string, issuerData: OAuth2TrustedJwtIssuerSkeleton): Promise<OAuth2TrustedJwtIssuerSkeleton>
     * ```
     * @group Deprecated
     */
    putOAuth2TrustedJwtIssuer(issuerId: string, issuerData: OAuth2TrustedJwtIssuerSkeleton): Promise<OAuth2TrustedJwtIssuerSkeleton>;
};
/**
 * OAuth2 trusted jwt issuer export options
 */
interface OAuth2TrustedJwtIssuerExportOptions {
    /**
     * Use string arrays to store multi-line text in scripts.
     */
    useStringArrays: boolean;
    /**
     * Include any dependencies (scripts).
     */
    deps: boolean;
}
/**
 * OAuth2 trusted jwt issuer import options
 */
interface OAuth2TrustedJwtIssuerImportOptions {
    /**
     * Include any dependencies (scripts).
     */
    deps: boolean;
}
interface OAuth2TrustedJwtIssuerExportInterface {
    meta?: ExportMetaData;
    trustedJwtIssuer: Record<string, OAuth2TrustedJwtIssuerSkeleton>;
}

type Organization = {
    /**
     * Get organization managed object type
     * @returns {string} organization managed object type in this realm
     */
    getRealmManagedOrganization(): string;
    /**
     * Read all organizations
     * @returns {Promise<IdObjectSkeletonInterface[]>} promise resolving to an array of organization objects
     */
    readOrganizations(): Promise<IdObjectSkeletonInterface[]>;
    /**
     * Get organizations
     * @returns {Promise<IdObjectSkeletonInterface[]>} promise resolving to an array of organization objects
     * @deprecated since v2.0.0 use {@link Organization.readOrganizations | readOrganizations} instead
     * ```javascript
     * readOrganizations(): Promise<IdObjectSkeletonInterface[]>
     * ```
     * @group Deprecated
     */
    getOrganizations(): Promise<IdObjectSkeletonInterface[]>;
};

type Policy = {
    /**
     * Create policy export template
     */
    createPolicyExportTemplate(): PolicyExportInterface;
    /**
     * Read all policies
     * @returns {Promise<PolicySkeleton>} a promise that resolves to an array of policy set objects
     */
    readPolicies(): Promise<PolicySkeleton[]>;
    /**
     * Get policies by policy set
     * @param {string} policySetId policy set id/name
     * @returns {Promise<PolicySkeleton[]>} a promise resolving to an array of policy objects
     */
    readPoliciesByPolicySet(policySetId: string): Promise<PolicySkeleton[]>;
    /**
     * Get policy
     * @param {string} policyId policy id/name
     * @returns {Promise<PolicySkeleton>} promise resolving to a policy object
     */
    readPolicy(policyId: string): Promise<PolicySkeleton>;
    /**
     * Update or create policy
     * @param {string} policyId policy id/name
     * @param {PolicySkeleton} policyData policy object
     * @returns {Promise<PolicySkeleton>} promise resolving to a policy object
     */
    createPolicy(policyId: string, policyData: PolicySkeleton): Promise<PolicySkeleton>;
    /**
     * Update or create policy
     * @param {string} policyId policy id/name
     * @param {PolicySkeleton} policyData policy object
     * @returns {Promise<PolicySkeleton>} promise resolving to a policy object
     */
    updatePolicy(policyId: string, policyData: PolicySkeleton): Promise<PolicySkeleton>;
    /**
     * Delete policy
     * @param {string} policyId policy id/name
     * @returns {Promise<PolicySkeleton>} promise resolving to a policy object
     */
    deletePolicy(policyId: string): Promise<any>;
    /**
     * Export policy
     * @param {string} policyId policy id/name
     * @returns {Promise<PolicyExportInterface>} a promise that resolves to a PolicyExportInterface object
     */
    exportPolicy(policyId: string, options?: PolicyExportOptions): Promise<PolicyExportInterface>;
    /**
     * Export policies
     * @param {PolicyExportOptions} options export options
     * @returns {Promise<PolicyExportInterface>} a promise that resolves to an PolicyExportInterface object
     */
    exportPolicies(options?: PolicyExportOptions): Promise<PolicyExportInterface>;
    /**
     * Export policies by policy set
     * @param {string} policySetName policy set id/name
     * @param {PolicyExportOptions} options export options
     * @returns {Promise<PolicyExportInterface>} a promise that resolves to an PolicyExportInterface object
     */
    exportPoliciesByPolicySet(policySetName: string, options?: PolicyExportOptions): Promise<PolicyExportInterface>;
    /**
     * Import policy by id
     * @param {string} policyId policy id
     * @param {PolicyExportInterface} importData import data
     * @param {PolicyImportOptions} options import options
     * @returns {Promise<PolicySkeleton>} imported policy object
     */
    importPolicy(policyId: string, importData: PolicyExportInterface, options?: PolicyImportOptions): Promise<PolicySkeleton>;
    /**
     * Import first policy
     * @param {PolicyExportInterface} importData import data
     * @param {PolicyImportOptions} options import options
     * @returns {Promise<PolicySkeleton>} imported policy object
     */
    importFirstPolicy(importData: PolicyExportInterface, options?: PolicyImportOptions): Promise<PolicySkeleton>;
    /**
     * Import policies
     * @param {PolicyExportInterface} importData import data
     * @param {PolicyImportOptions} options import options
     * @returns {Promise<PolicySkeleton[]>} array of imported policy objects
     */
    importPolicies(importData: PolicyExportInterface, options?: PolicyImportOptions): Promise<PolicySkeleton[]>;
    /**
     * Get all policies
     * @returns {Promise<PolicySkeleton>} a promise that resolves to an array of policy set objects
     * @deprecated since v2.0.0 use {@link Agent.readPolicies | readPolicies} instead
     * ```javascript
     * readPolicies(): Promise<PolicySkeleton[]>
     * ```
     * @group Deprecated
     */
    getPolicies(): Promise<PolicySkeleton[]>;
    /**
     * Get policies by policy set
     * @param {string} policySetId policy set id/name
     * @returns {Promise<PolicySkeleton[]>} a promise resolving to an array of policy objects
     * @deprecated since v2.0.0 use {@link Agent.readPoliciesByPolicySet | readPoliciesByPolicySet} instead
     * ```javascript
     * readPoliciesByPolicySet(policySetId: string): Promise<PolicySkeleton[]>
     * ```
     * @group Deprecated
     */
    getPoliciesByPolicySet(policySetId: string): Promise<PolicySkeleton[]>;
    /**
     * Get policy
     * @param {string} policyId policy id/name
     * @returns {Promise<PolicySkeleton>} promise resolving to a policy object
     * @deprecated since v2.0.0 use {@link Agent.readPolicy | readPolicy} instead
     * ```javascript
     * readPolicy(policyId: string): Promise<PolicySkeleton>
     * ```
     * @group Deprecated
     */
    getPolicy(policyId: string): Promise<PolicySkeleton>;
    /**
     * Update or create policy
     * @param {string} policyId policy id/name
     * @param {PolicySkeleton} policyData policy object
     * @returns {Promise<PolicySkeleton>} promise resolving to a policy object
     * @deprecated since v2.0.0 use {@link Agent.updatePolicy | updatePolicy} or {@link Agent.createPolicy | createPolicy} instead
     * ```javascript
     * updatePolicy(policyId: string, policyData: PolicySkeleton): Promise<PolicySkeleton>
     * createPolicy(policyId: string, policyData: PolicySkeleton): Promise<PolicySkeleton>
     * ```
     * @group Deprecated
     */
    putPolicy(policyId: string, policyData: PolicySkeleton): Promise<PolicySkeleton>;
};
interface PolicyExportInterface {
    meta?: ExportMetaData;
    script: Record<string, ScriptSkeleton>;
    resourcetype: Record<string, ResourceTypeSkeleton>;
    policy: Record<string, PolicySkeleton>;
    policyset: Record<string, PolicySetSkeleton>;
}
/**
 * Policy export options
 */
interface PolicyExportOptions {
    /**
     * Include any dependencies (scripts).
     */
    deps: boolean;
    /**
     * Include any prerequisites (policy sets, resource types).
     */
    prereqs: boolean;
    /**
     * Use string arrays to store multi-line text in scripts.
     */
    useStringArrays: boolean;
}
/**
 * Policy import options
 */
interface PolicyImportOptions {
    /**
     * Include any dependencies (scripts).
     */
    deps: boolean;
    /**
     * Include any prerequisites (policy sets, resource types).
     */
    prereqs: boolean;
    /**
     * Import policies into different policy set
     */
    policySetName?: string;
}

type PolicySet = {
    /**
     * Create policy export template
     * @returns {PolicySetExportInterface} policy export interface
     */
    createPolicySetExportTemplate(): PolicySetExportInterface;
    /**
     * Read all policy sets
     * @returns {Promise<PolicySetSkeleton[]>} a promise that resolves to an array of policy set objects
     */
    readPolicySets(): Promise<PolicySetSkeleton[]>;
    /**
     * Read policy set
     * @param {string} policySetName policy set name
     * @returns {Promise<PolicySetSkeleton>} a promise that resolves to a policy set object
     */
    readPolicySet(policySetName: string): Promise<PolicySetSkeleton>;
    createPolicySet(policySetData: PolicySetSkeleton, policySetName?: string): Promise<PolicySetSkeleton>;
    updatePolicySet(policySetData: PolicySetSkeleton, policySetName?: string): Promise<PolicySetSkeleton>;
    deletePolicySet(policySetName: string): Promise<PolicySetSkeleton>;
    /**
     * Export policy set
     * @param {string} policySetName policy set name
     * @param {PolicySetExportOptions} options export options
     * @returns {Promise<PolicySetExportInterface>} a promise that resolves to an PolicySetExportInterface object
     */
    exportPolicySet(policySetName: string, options?: PolicySetExportOptions): Promise<PolicySetExportInterface>;
    /**
     * Export policy sets
     * @param {PolicySetExportOptions} options export options
     * @returns {Promise<PolicySetExportInterface>} a promise that resolves to an PolicySetExportInterface object
     */
    exportPolicySets(options?: PolicySetExportOptions): Promise<PolicySetExportInterface>;
    /**
     * Import policy set
     * @param {string} policySetName policy set name
     * @param {PolicySetExportInterface} importData import data
     * @param {PolicySetImportOptions} options import options
     */
    importPolicySet(policySetName: string, importData: PolicySetExportInterface, options?: PolicySetImportOptions): Promise<any>;
    /**
     * Import first policy set
     * @param {PolicySetExportInterface} importData import data
     * @param {PolicySetImportOptions} options import options
     */
    importFirstPolicySet(importData: PolicySetExportInterface, options?: PolicySetImportOptions): Promise<any>;
    /**
     * Import policy sets
     * @param {PolicySetExportInterface} importData import data
     * @param {PolicySetImportOptions} options import options
     */
    importPolicySets(importData: PolicySetExportInterface, options?: PolicySetImportOptions): Promise<any>;
    /**
     * Get all policy sets
     * @returns {Promise<PolicySetSkeleton[]>} a promise that resolves to an array of policy set objects
     * @deprecated since v2.0.0 use {@link Policy.readPolicySets | readPolicySets} instead
     * ```javascript
     * readPolicySets(): Promise<PolicySetSkeleton[]>
     * ```
     * @group Deprecated
     */
    getPolicySets(): Promise<PolicySetSkeleton[]>;
    /**
     * Get policy set
     * @param {string} policySetName policy set name
     * @returns {Promise<PolicySetSkeleton>} a promise that resolves to a policy set object
     * @deprecated since v2.0.0 use {@link Policy.readPolicySet | readPolicySet} instead
     * ```javascript
     * readPolicySet(policySetName: string): Promise<PolicySetSkeleton>
     * ```
     * @group Deprecated
     */
    getPolicySet(policySetName: string): Promise<PolicySetSkeleton>;
};
interface PolicySetExportInterface {
    meta?: ExportMetaData;
    script: Record<string, ScriptSkeleton>;
    resourcetype: Record<string, ResourceTypeSkeleton>;
    policy: Record<string, PolicySkeleton>;
    policyset: Record<string, PolicySetSkeleton>;
}
/**
 * Application/policy set export options
 */
interface PolicySetExportOptions {
    /**
     * Include any dependencies (policies, scripts, resource types).
     */
    deps: boolean;
    /**
     * Include any prerequisites (policy sets, resource types).
     */
    prereqs: boolean;
    /**
     * Use string arrays to store multi-line text in scripts.
     */
    useStringArrays: boolean;
}
/**
 * Policy set import options
 */
interface PolicySetImportOptions {
    /**
     * Include any dependencies (policies, scripts, resource types).
     */
    deps: boolean;
    /**
     * Include any prerequisites (policy sets, resource types).
     */
    prereqs: boolean;
}

type RealmSkeleton = IdObjectSkeletonInterface & {
    parentPath: string;
    active: boolean;
    name: string;
    aliases: string[];
};

type Realm = {
    /**
     * Read all realms
     * @returns {Promise<RealmSkeleton[]>} a promise resolving to an array of realm objects
     */
    readRealms(): Promise<RealmSkeleton[]>;
    /**
     * Read realm
     * @param {string} realmId realm id
     * @returns {Promise<RealmSkeleton>} a promise resolving to a realm object
     */
    readRealm(realmId: string): Promise<RealmSkeleton>;
    /**
     * Read realm by name
     * @param {string} realmName realm name
     * @returns {Promise<RealmSkeleton>} a promise resolving to a realm object
     */
    readRealmByName(realmName: string): Promise<RealmSkeleton>;
    /**
     * Create realm
     * @param {string} realmName realm name
     * @param {RealmSkeleton} realmData realm data
     * @returns {Promise<RealmSkeleton>} a promise resolving to a realm object
     */
    createRealm(realmName: string, realmData?: RealmSkeleton): Promise<RealmSkeleton>;
    /**
     * Update realm
     * @param {string} realmId realm id
     * @param {RealmSkeleton} realmData realm data
     * @returns {Promise<RealmSkeleton>} a promise resolving to a realm object
     */
    updateRealm(realmId: string, realmData: RealmSkeleton): Promise<RealmSkeleton>;
    /**
     * Delete realm
     * @param {string} realmId realm id
     * @returns {Promise<RealmSkeleton>} a promise resolving to a realm object
     */
    deleteRealm(realmId: string): Promise<RealmSkeleton>;
    /**
     * Delete realm by name
     * @param {string} realmName realm name
     * @returns {Promise<RealmSkeleton>} a promise resolving to a realm object
     */
    deleteRealmByName(realmName: string): Promise<RealmSkeleton>;
    /**
     * Add custom DNS domain name (realm DNS alias)
     * @param {string} realmName realm name
     * @param {string} domain domain name
     * @returns {Promise<RealmSkeleton>} a promise resolving to a realm object
     */
    addCustomDomain(realmName: string, domain: string): Promise<RealmSkeleton>;
    /**
     * Remove custom DNS domain name (realm DNS alias)
     * @param {string} realmName realm name
     * @param {string} domain domain name
     * @returns {Promise<RealmSkeleton>} a promise resolving to a realm object
     */
    removeCustomDomain(realmName: string, domain: string): Promise<RealmSkeleton>;
    /**
     * Get all realms
     * @returns {Promise<RealmSkeleton[]>} a promise resolving to an array of realm objects
     * @deprecated since v2.0.0 use {@link Realm.readRealms | readRealms} instead
     * ```javascript
     * readRealms(): Promise<RealmSkeleton[]>
     * ```
     * @group Deprecated
     */
    getRealms(): Promise<RealmSkeleton[]>;
    /**
     * Get realm by name
     * @param {string} realmName realm name
     * @returns {Promise<RealmSkeleton>} a promise resolving to a realm object
     * @deprecated since v2.0.0 use {@link Realm.readRealmByName | readRealmByName} instead
     * ```javascript
     * readRealmByName(realmName: string): Promise<RealmSkeleton>
     * ```
     * @group Deprecated
     */
    getRealmByName(realmName: string): Promise<RealmSkeleton>;
    /**
     * Update realm
     * @param {string} realmId realm id
     * @param {RealmSkeleton} realmData realm data
     * @returns {Promise<RealmSkeleton>} a promise resolving to a realm object
     * @deprecated since v2.0.0 use {@link Realm.updateRealm | updateRealm} or {@link Realm.createRealm | createRealm} instead
     * ```javascript
     * updateRealm(realmId: string, realmData: RealmSkeleton): Promise<RealmSkeleton>
     * createRealm(realmName: string, realmData: RealmSkeleton): Promise<RealmSkeleton>
     * ```
     * @group Deprecated
     */
    putRealm(realmId: string, realmData: RealmSkeleton): Promise<RealmSkeleton>;
};

type ReconType = IdObjectSkeletonInterface & {
    mapping: string;
    state: 'SUCCESS' | string;
    stage: 'COMPLETED_SUCCESS' | string;
    stageDescription: string;
    progress: {
        source: {
            existing: {
                processed: number;
                total: string;
            };
        };
        target: {
            existing: {
                processed: number;
                total: string;
            };
            created: number;
            unchanged: number;
            updated: number;
            deleted: number;
        };
        links: {
            existing: {
                processed: number;
                total: string;
            };
            created: number;
        };
    };
    situationSummary: {
        SOURCE_IGNORED: number;
        TARGET_CHANGED: number;
        SOURCE_TARGET_CONFLICT: number;
        FOUND_ALREADY_LINKED: number;
        UNQUALIFIED: number;
        ABSENT: number;
        TARGET_IGNORED: number;
        MISSING: number;
        ALL_GONE: number;
        UNASSIGNED: number;
        AMBIGUOUS: number;
        CONFIRMED: number;
        LINK_ONLY: number;
        SOURCE_MISSING: number;
        FOUND: number;
    };
    statusSummary: {
        SUCCESS: number;
        FAILURE: number;
    };
    durationSummary: {
        sourceQuery: {
            min: number;
            max: number;
            mean: number;
            count: number;
            sum: number;
            stdDev: number;
        };
        auditLog: {
            min: number;
            max: number;
            mean: number;
            count: number;
            sum: number;
            stdDev: number;
        };
        defaultPropertyMapping: {
            min: number;
            max: number;
            mean: number;
            count: number;
            sum: number;
            stdDev: number;
        };
        sourceLinkQuery: {
            min: number;
            max: number;
            mean: number;
            count: number;
            sum: number;
            stdDev: number;
        };
        updateTargetObject: {
            min: number;
            max: number;
            mean: number;
            count: number;
            sum: number;
            stdDev: number;
        };
        propertyMappingScript: {
            min: number;
            max: number;
            mean: number;
            count: number;
            sum: number;
            stdDev: number;
        };
        updateLastSync: {
            min: number;
            max: number;
            mean: number;
            count: number;
            sum: number;
            stdDev: number;
        };
        targetObjectQuery: {
            min: number;
            max: number;
            mean: number;
            count: number;
            sum: number;
            stdDev: number;
        };
        sourcePhase: {
            min: number;
            max: number;
            mean: number;
            count: number;
            sum: number;
            stdDev: number;
        };
    };
    parameters: {
        sourceIds: [string];
        sourceQuery: {
            resourceName: string;
            _queryFilter: string;
            _fields: string;
        };
        targetQuery: {
            resourceName: string;
            queryFilter: string;
            _fields: string;
        };
    };
    started: string;
    ended: string;
    duration: number;
    sourceProcessedByNode: object;
};
type ReconStatusType = IdObjectSkeletonInterface & {
    state: 'ACTIVE' | string;
    action: 'cancel' | string;
    status: 'INITIATED' | string;
};

type Recon = {
    /**
     * Read all reconciliation runs
     * @returns {Promise<ReconType[]>} a promise resolving to an array of recon objects
     */
    readRecons(): Promise<ReconType[]>;
    /**
     * Read recon
     * @param {string} reconId id of the recon
     * @returns {Promise<ReconType>} a promise resolving to a recon object
     */
    readRecon(reconId: string): Promise<ReconType>;
    /**
     * Start a reconciliation
     * @param {string} mappingName mapping to reconcile
     * @returns {Promise<ReconStatusType>} a promise resolving to a recon status object
     */
    startRecon(mappingName: string): Promise<ReconStatusType>;
    /**
     * Start a reconciliation by Id
     * @param {string} mappingName mapping to reconcile
     * @param {string} objectId id of object to reconcile
     * @returns {Promise<ReconStatusType>} a promise resolving to a recon status object
     */
    startReconById(mappingName: string, objectId: string): Promise<ReconStatusType>;
    /**
     * Cancel a reconciliation
     * @param {string} reconId id of the recon to cancel
     * @returns {Promise<ReconStatusType>} a promise resolving to a recon status object
     */
    cancelRecon(reconId: string): Promise<ReconStatusType>;
};

type ResourceType = {
    /**
     * Read resource type
     * @param resourceTypeUuid resource type uuid
     * @returns {Promise<ResourceTypeSkeleton>} a promise that resolves to a resource type object
     */
    readResourceType(resourceTypeUuid: string): Promise<ResourceTypeSkeleton>;
    /**
     * Read all resource types
     * @returns {Promise<ResourceTypeSkeleton[]>} a promise that resolves to an array of resource type objects
     */
    readResourceTypes(): Promise<ResourceTypeSkeleton[]>;
    /**
     * Read resource type by name
     * @param {string} resourceTypeName resource type name
     * @returns {Promise<ResourceTypeSkeleton>} a promise that resolves to a resource type object
     */
    readResourceTypeByName(resourceTypeName: string): Promise<ResourceTypeSkeleton>;
    /**
     * Create resource type
     * @param resourceTypeData resource type data
     * @param resourceTypeUuid resource type uuid
     * @returns {Promise<ResourceTypeSkeleton>} a promise that resolves to a resource type object
     */
    createResourceType(resourceTypeData: ResourceTypeSkeleton, resourceTypeUuid?: string): Promise<ResourceTypeSkeleton>;
    /**
     * Update resource type
     * @param {string} resourceTypeData resource type data
     * @returns {Promise<ResourceTypeSkeleton>} a promise that resolves to a resource type object
     */
    updateResourceType(resourceTypeUuid: string, resourceTypeData: ResourceTypeSkeleton): Promise<ResourceTypeSkeleton>;
    /**
     * Delete resource type
     * @param {string} resourceTypeUuid resource type uuid
     * @returns {Promise<ResourceTypeSkeleton>} Promise resolvig to a resource type object
     */
    deleteResourceType(resourceTypeUuid: string): Promise<ResourceTypeSkeleton>;
    /**
     * Delete resource type by name
     * @param {string} resourceTypeName resource type name
     * @returns {Promise<ResourceTypeSkeleton>} Promise resolvig to a resource type object
     */
    deleteResourceTypeByName(resourceTypeName: string): Promise<ResourceTypeSkeleton>;
    /**
     * Export resource type
     * @param {string} resourceTypeUuid resource type uuid
     * @returns {Promise<ResourceTypeExportInterface>} a promise that resolves to an ResourceTypeExportInterface object
     */
    exportResourceType(resourceTypeUuid: string): Promise<ResourceTypeExportInterface>;
    /**
     * Export resource type by name
     * @param {string} resourceTypeName resource type name
     * @returns {Promise<ResourceTypeExportInterface>} a promise that resolves to an ResourceTypeExportInterface object
     */
    exportResourceTypeByName(resourceTypeName: string): Promise<ResourceTypeExportInterface>;
    /**
     * Export resource types
     * @returns {Promise<ResourceTypeExportInterface>} a promise that resolves to an ResourceTypeExportInterface object
     */
    exportResourceTypes(): Promise<ResourceTypeExportInterface>;
    /**
     * Import resource type by uuid
     * @param {string} resourceTypeUuid client uuid
     * @param {ResourceTypeExportInterface} importData import data
     */
    importResourceType(resourceTypeUuid: string, importData: ResourceTypeExportInterface): Promise<any>;
    /**
     * Import resource type by name
     * @param {string} resourceTypeName client id
     * @param {ResourceTypeExportInterface} importData import data
     */
    importResourceTypeByName(resourceTypeName: string, importData: ResourceTypeExportInterface): Promise<any>;
    /**
     * Import first resource type
     * @param {ResourceTypeExportInterface} importData import data
     */
    importFirstResourceType(importData: ResourceTypeExportInterface): Promise<any>;
    /**
     * Import resource types
     * @param {ResourceTypeExportInterface} importData import data
     */
    importResourceTypes(importData: ResourceTypeExportInterface): Promise<any[]>;
    /**
     * Get resource type
     * @param resourceTypeUuid resource type uuid
     * @returns {Promise<ResourceTypeSkeleton>} a promise that resolves to a resource type object
     * @deprecated since v2.0.0 use {@link Agent.readResourceType | readResourceType} instead
     * ```javascript
     * readResourceType(resourceTypeUuid: string): Promise<ResourceTypeSkeleton>
     * ```
     * @group Deprecated
     */
    getResourceType(resourceTypeUuid: string): Promise<ResourceTypeSkeleton>;
    /**
     * Get all resource types
     * @returns {Promise<ResourceTypeSkeleton[]>} a promise that resolves to an array of resource type objects
     * @deprecated since v2.0.0 use {@link Agent.readResourceTypes | readResourceTypes} instead
     * ```javascript
     * readResourceTypes(): Promise<ResourceTypeSkeleton[]>
     * ```
     * @group Deprecated
     */
    getResourceTypes(): Promise<ResourceTypeSkeleton[]>;
    /**
     * Get resource type by name
     * @param {string} resourceTypeName resource type name
     * @returns {Promise<ResourceTypeSkeleton>} a promise that resolves to a resource type object
     * @deprecated since v2.0.0 use {@link Agent.readResourceTypeByName | readResourceTypeByName} instead
     * ```javascript
     * readResourceTypeByName(resourceTypeName: string): Promise<ResourceTypeSkeleton>
     * ```
     * @group Deprecated
     */
    getResourceTypeByName(resourceTypeName: string): Promise<ResourceTypeSkeleton>;
};
interface ResourceTypeExportInterface {
    meta?: ExportMetaData;
    resourcetype: Record<string, ResourceTypeSkeleton>;
}

type Saml2 = {
    /**
     * Read all SAML2 entity provider stubs
     * @returns {Promise<Saml2ProviderStub[]>} a promise that resolves to an array of saml2 entity stubs
     */
    readSaml2ProviderStubs(): Promise<Saml2ProviderStub[]>;
    /**
     *
     * @param {string} entityId Provider entity id
     * @returns {Promise<Saml2ProviderStub>} Promise resolving to a Saml2ExportInterface object.
     */
    readSaml2ProviderStub(entityId: string): Promise<Saml2ProviderStub>;
    /**
     * Export a single entity provider. The response can be saved to file as is.
     * @param {string} entityId Provider entity id
     * @returns {Promise<Saml2ProviderSkeleton>} Promise resolving to a Saml2ExportInterface object.
     */
    readSaml2Provider(entityId: string): Promise<Saml2ProviderSkeleton>;
    /**
     * Create a SAML2 entity provider
     * @param {Saml2ProiderLocation} location 'hosted' or 'remote'
     * @param {Saml2ProviderSkeleton} providerData Object representing a SAML entity provider
     * @param {string} metaData Base64-encoded metadata XML. Only required for remote providers
     * @returns {Promise<Saml2ProviderSkeleton>} a promise that resolves to a saml2 entity provider object
     */
    createSaml2Provider(location: Saml2ProiderLocation, providerData: Saml2ProviderSkeleton, metaData: string): Promise<Saml2ProviderSkeleton>;
    /**
     * Update SAML2 entity provider
     * @param {Saml2ProiderLocation} location Entity provider location (hosted or remote)
     * @param {string} entityId SAML2 entity id
     * @param {Saml2ProviderSkeleton} providerData Object representing a SAML entity provider
     * @returns {Promise<Saml2ProviderSkeleton>} a promise that resolves to a saml2 entity provider object
     */
    updateSaml2Provider(location: Saml2ProiderLocation, providerData: Saml2ProviderSkeleton, entityId?: string): Promise<Saml2ProviderSkeleton>;
    /**
     * Delete an entity provider. The response can be saved to file as is.
     * @param {string} entityId Provider entity id
     * @returns {Promise<Saml2ProviderSkeleton>} Promise resolving to a Saml2ExportInterface object.
     */
    deleteSaml2Provider(entityId: string): Promise<Saml2ProviderSkeleton>;
    /**
     * Delete all entity providers.
     * @returns {Promise<Saml2ProviderSkeleton[]>} Promise resolving to an array of Saml2ProviderSkeleton objects.
     */
    deleteSaml2Providers(): Promise<Saml2ProviderSkeleton[]>;
    /**
     * Get a SAML2 entity provider's metadata URL by entity id
     * @param {string} entityId SAML2 entity id
     * @returns {string} the URL to get the metadata from
     */
    getSaml2ProviderMetadataUrl(entityId: string): string;
    /**
     * Get a SAML2 entity provider's metadata by entity id
     * @param {string} entityId SAML2 entity id
     * @returns {Promise<object>} a promise that resolves to an object containing a SAML2 metadata
     */
    getSaml2ProviderMetadata(entityId: string): Promise<any>;
    /**
     * Export a single entity provider. The response can be saved to file as is.
     * @param {string} entityId Provider entity id
     * @param {Saml2EntitiesExportOptions} options export options
     * @returns {Promise<Saml2ExportInterface>} Promise resolving to a Saml2ExportInterface object.
     */
    exportSaml2Provider(entityId: string, options?: Saml2EntitiesExportOptions): Promise<Saml2ExportInterface>;
    /**
     * Export all entity providers. The response can be saved to file as is.
     * @param {Saml2EntitiesExportOptions} options export options
     * @returns {Promise<Saml2ExportInterface>} Promise resolving to a Saml2ExportInterface object.
     */
    exportSaml2Providers(options?: Saml2EntitiesExportOptions): Promise<Saml2ExportInterface>;
    /**
     * Import a SAML entity provider
     * @param {string} entityId Provider entity id
     * @param {Saml2ExportInterface} importData Import data
     * @param {Saml2EntitiesImportOptions} options import options
     * @returns {Promise<Saml2ProviderSkeleton>} a promise resolving to a provider object
     */
    importSaml2Provider(entityId: string, importData: Saml2ExportInterface, options?: Saml2EntitiesImportOptions): Promise<Saml2ProviderSkeleton>;
    /**
     * Import SAML entity providers
     * @param {Saml2ExportInterface} importData Import data
     * @param {Saml2EntitiesImportOptions} options import options
     * @returns {Promise<Saml2ProviderSkeleton[]>} a promise resolving to an array of provider objects
     */
    importSaml2Providers(importData: Saml2ExportInterface, options?: Saml2EntitiesImportOptions): Promise<Saml2ProviderSkeleton[]>;
    /**
     * Get SAML2 entity provider stubs
     * @returns {Promise<Saml2ProviderStub[]>} a promise that resolves to an array of saml2 entity stubs
     * @deprecated since v2.0.0 use {@link Saml2.readSaml2ProviderStubs | readSaml2ProviderStubs} instead
     * ```javascript
     * readSaml2ProviderStubs(): Promise<Saml2ProviderStub[]>
     * ```
     * @group Deprecated
     */
    getSaml2ProviderStubs(): Promise<Saml2ProviderStub[]>;
    /**
     * Get a SAML2 entity provider's metadata URL by entity id
     * @param {string} entityId SAML2 entity id
     * @returns {string} the URL to get the metadata from
     * @deprecated since v2.0.0 use {@link Saml2.getSaml2ProviderMetadataUrl | getSaml2ProviderMetadataUrl} instead
     * ```javascript
     * getSaml2ProviderMetadataUrl(entityId: string): string
     * ```
     * @group Deprecated
     */
    getProviderMetadataUrl(entityId: string): string;
    /**
     * Get a SAML2 entity provider's metadata by entity id
     * @param {string} entityId SAML2 entity id
     * @returns {Promise<any>} a promise that resolves to an object containing a SAML2 metadata
     * @deprecated since v2.0.0 use {@link Saml2.getSaml2ProviderMetadata | getSaml2ProviderMetadata} instead
     * ```javascript
     * getSaml2ProviderMetadata(entityId: string): Promise<any>
     * ```
     * @group Deprecated
     */
    getProviderMetadata(entityId: string): Promise<any>;
    /**
     *
     * @param {string} entityId Provider entity id
     * @returns {Promise<Saml2ProviderStub>} Promise resolving to a Saml2ExportInterface object.
     * @deprecated since v2.0.0 use {@link Saml2.readSaml2ProviderStub | readSaml2ProviderStub} instead
     * ```javascript
     * readSaml2ProviderStub(entityId: string): Promise<Saml2ProviderStub>
     * ```
     * @group Deprecated
     */
    getSaml2ProviderStub(entityId: string): Promise<Saml2ProviderStub>;
    /**
     * Export a single entity provider. The response can be saved to file as is.
     * @param {string} entityId Provider entity id
     * @returns {Promise<Saml2ProviderSkeleton>} Promise resolving to a Saml2ExportInterface object.
     * @deprecated since v2.0.0 use {@link Saml2.readSaml2Provider | readSaml2Provider} instead
     * ```javascript
     * readSaml2Provider(entityId: string): Promise<Saml2ProviderSkeleton>
     * ```
     * @group Deprecated
     */
    getSaml2Provider(entityId: string): Promise<Saml2ProviderSkeleton>;
};
interface Saml2EntitiesImportOptions {
    /**
     * Include any dependencies (scripts).
     */
    deps: boolean;
}
interface Saml2EntitiesExportOptions {
    /**
     * Include any dependencies (scripts).
     */
    deps: boolean;
}
interface Saml2ExportInterface {
    meta?: ExportMetaData;
    script: Record<string, ScriptSkeleton>;
    saml: {
        hosted: Record<string, Saml2ProviderSkeleton>;
        remote: Record<string, Saml2ProviderSkeleton>;
        metadata: Record<string, string[]>;
    };
}

type Script = {
    /**
     * Create an empty script export template
     * @returns {ScriptExportInterface} an empty script export template
     */
    createScriptExportTemplate(): ScriptExportInterface;
    /**
     * Read all scripts
     * @returns {Promise<ScriptSkeleton[]>} a promise that resolves to an array of script objects
     */
    readScripts(): Promise<ScriptSkeleton[]>;
    /**
     * Read script
     * @param {string} scriptId script id
     * @returns {Promise<ScriptSkeleton>} promise that resolves to a script object
     */
    readScript(scriptId: string): Promise<ScriptSkeleton>;
    /**
     * Read script by name
     * @param {string} scriptName name of the script
     * @returns {Promise<ScriptSkeleton>} promise that resolves to a script object
     */
    readScriptByName(scriptName: string): Promise<ScriptSkeleton>;
    /**
     * Create script
     * @param {string} scriptId script id
     * @param {string} scriptName name of the script
     * @param {ScriptSkeleton} scriptData script object
     * @returns {Promise<ScriptSkeleton>} a status object
     */
    createScript(scriptId: string, scriptName: string, scriptData: ScriptSkeleton): Promise<ScriptSkeleton>;
    /**
     * Create or update script
     * @param {string} scriptId script id
     * @param {ScriptSkeleton} scriptData script object
     * @returns {Promise<ScriptSkeleton>} a status object
     */
    updateScript(scriptId: string, scriptData: ScriptSkeleton): Promise<ScriptSkeleton>;
    /**
     * Delete script
     * @param {string} scriptId script id
     * @returns {Promise<ScriptSkeleton>} promise that resolves to a script object
     */
    deleteScript(scriptId: string): Promise<ScriptSkeleton>;
    /**
     * Delete script by name
     * @param {String} scriptId script name
     * @returns {Promise<ScriptSkeleton>} a promise that resolves to a script object
     */
    deleteScriptByName(scriptName: string): Promise<ScriptSkeleton>;
    /**
     * Delete all non-default scripts
     * @returns {Promise<ScriptSkeleton[]>>} a promise that resolves to an array of script objects
     */
    deleteScripts(): Promise<ScriptSkeleton[]>;
    /**
     * Export all scripts
     * @param includeDefault true to include default scripts in export, false otherwise. Default: false
     * @returns {Promise<ScriptExportInterface>} a promise that resolved to a ScriptExportInterface object
     */
    exportScripts(includeDefault: boolean): Promise<ScriptExportInterface>;
    /**
     * Export script by id
     * @param {string} scriptId script uuid
     * @returns {Promise<ScriptExportInterface>} a promise that resolved to a ScriptExportInterface object
     */
    exportScript(scriptId: string): Promise<ScriptExportInterface>;
    /**
     * Export script by name
     * @param {string} scriptName script name
     * @returns {Promise<ScriptExportInterface>} a promise that resolved to a ScriptExportInterface object
     */
    exportScriptByName(scriptName: string): Promise<ScriptExportInterface>;
    /**
     * Import scripts
     * @param {string} scriptName Optional name of script. If supplied, only the script of that name is imported
     * @param {ScriptExportInterface} importData Script import data
     * @param {ScriptImportOptions} options Script import options
     * @param {boolean} validate If true, validates Javascript scripts to ensure no errors exist in them. Default: false
     * @returns {Promise<ScriptSkeleton[]>} true if no errors occurred during import, false otherwise
     */
    importScripts(scriptName: string, importData: ScriptExportInterface, options?: ScriptImportOptions, validate?: boolean): Promise<ScriptSkeleton[]>;
    /**
     * Get all scripts
     * @returns {Promise<ScriptSkeleton[]>} a promise that resolves to an array of script objects
     * @deprecated since v2.0.0 use {@link Script.readScripts | readScripts} instead
     * ```javascript
     * readScripts(): Promise<ScriptSkeleton[]>
     * ```
     * @group Deprecated
     */
    getScripts(): Promise<ScriptSkeleton[]>;
    /**
     * Get script
     * @param {string} scriptId script id
     * @returns {Promise<ScriptSkeleton>} promise that resolves to a script object
     * @deprecated since v2.0.0 use {@link Script.readScript | readScript} instead
     * ```javascript
     * readScript(scriptName: string): Promise<ScriptSkeleton>
     * ```
     * @group Deprecated
     */
    getScript(scriptId: string): Promise<ScriptSkeleton>;
    /**
     * Get script by name
     * @param {string} scriptName name of the script
     * @returns {Promise<ScriptSkeleton>} promise that resolves to a script object
     * @deprecated since v2.0.0 use {@link Script.readScriptByName | readScriptByName} instead
     * ```javascript
     * readScriptByName(scriptName: string): Promise<ScriptSkeleton>
     * ```
     * @group Deprecated
     */
    getScriptByName(scriptName: string): Promise<ScriptSkeleton>;
    /**
     * Create or update script
     * @param {string} scriptId script uuid
     * @param {ScriptSkeleton} scriptData script object
     * @returns {Promise<ScriptSkeleton>} a status object
     * @deprecated since v2.0.0 use {@link Script.updateScript | updateScript} or {@link Script.createScript | createScript} instead
     * ```javascript
     * updateScript(scriptId: string, scriptData: ScriptSkeleton): Promise<ScriptSkeleton>
     * createScript(scriptId: string, scriptName: string, scriptData: ScriptSkeleton): Promise<ScriptSkeleton>
     * ```
     * @group Deprecated
     */
    putScript(scriptId: string, scriptData: ScriptSkeleton): Promise<ScriptSkeleton>;
};
interface ScriptExportInterface {
    meta?: ExportMetaData;
    script: Record<string, ScriptSkeleton>;
}
/**
 * Script import options
 */
interface ScriptImportOptions {
    /**
     * Generate new UUIDs for all scripts during import.
     */
    reUuid: boolean;
    /**
     * Include default scripts in import if true
     */
    includeDefault: boolean;
}

type Service = {
    createServiceExportTemplate(): ServiceExportInterface;
    /**
     * Get list of services
     * @param {boolean} globalConfig true if the list of global services is requested, false otherwise. Default: false.
     */
    getListOfServices(globalConfig?: boolean): Promise<ServiceListItem[]>;
    /**
     * Get all services including their descendents.
     * @param {boolean} globalConfig true if the global service is the target of the operation, false otherwise. Default: false.
     * @returns Promise resolving to an array of services with their descendants
     */
    getFullServices(globalConfig?: boolean): Promise<FullService[]>;
    /**
     * Deletes the specified service
     * @param {string} serviceId The service to delete
     * @param {boolean} globalConfig true if the global service is the target of the operation, false otherwise. Default: false.
     */
    deleteFullService(serviceId: string, globalConfig?: boolean): Promise<AmServiceSkeleton>;
    /**
     * Deletes all services
     * @param {boolean} globalConfig true if the global service is the target of the operation, false otherwise. Default: false.
     */
    deleteFullServices(globalConfig?: boolean): Promise<AmServiceSkeleton[]>;
    /**
     * Export service. The response can be saved to file as is.
     * @param serviceId service id/name
     * @param {boolean} globalConfig true if the global service is the target of the operation, false otherwise. Default: false.
     * @returns {Promise<ServiceExportInterface>} Promise resolving to a ServiceExportInterface object.
     */
    exportService(serviceId: string, globalConfig?: boolean): Promise<ServiceExportInterface>;
    /**
     * Export all services
     * @param {boolean} globalConfig true if the global service is the target of the operation, false otherwise. Default: false.
     */
    exportServices(globalConfig?: boolean): Promise<ServiceExportInterface>;
    /**
     * Imports a single service using a reference to the service and a file to read the data from. Optionally clean (remove) an existing service first
     * @param {string} serviceId The service id/name to add
     * @param {ServiceExportInterface} importData The service configuration export data to import
     * @param {ServiceImportOptions} options Import options
     * @returns {Promise<AmServiceSkeleton>} A promise resolving to a service object
     */
    importService(serviceId: string, importData: ServiceExportInterface, options: ServiceImportOptions): Promise<AmServiceSkeleton>;
    /**
     * Imports multiple services from the same file. Optionally clean (remove) existing services first
     * @param {ServiceExportInterface} importData The service configuration export data to import
     * @param {ServiceImportOptions} options Import options
     * @returns {Promise<AmServiceSkeleton[]>} A promise resolving to an array of service objects
     */
    importServices(importData: ServiceExportInterface, options: ServiceImportOptions): Promise<AmServiceSkeleton[]>;
};
interface ServiceExportInterface {
    meta?: ExportMetaData;
    service: Record<string, AmServiceSkeleton>;
}
/**
 * Service import options
 */
interface ServiceImportOptions {
    /**
     * Indicates whether to remove previously existing services of the same id before importing
     */
    clean: boolean;
    /**
     * Indicates whether to import service(s) as global services
     */
    global: boolean;
    /**
     * Indicates whether to import service(s) to the current realm
     */
    realm: boolean;
}

type SessionInfoType = {
    username: string;
    universalId: string;
    realm: string;
    latestAccessTime: string;
    maxIdleExpirationTime: string;
    maxSessionExpirationTime: string;
    properties: {
        AMCtxId: string;
        [k: string]: string;
    };
};

type Session = {
    /**
     * Get session info
     * @param {string} tokenId session token
     * @returns {Promise<SessionInfoType>} a promise resolving to a session info object
     */
    getSessionInfo(tokenId: string): Promise<SessionInfoType>;
};

type TokenCache = {
    /**
     * Get connection profiles file name
     * @returns {string} connection profiles file name
     */
    getTokenCachePath(): string;
    /**
     * Initialize token cache
     *
     * This method is called from app.ts and runs before any of the message handlers are registered.
     * Therefore none of the Console message functions will produce any output.
     */
    initTokenCache(): void;
    /**
     * Check if there are suitable tokens in the cache
     * @param {tokenType} tokenType type of token
     * @returns {Promise<boolean>} true if tokens found in cache, false otherwise
     */
    hasToken(tokenType: tokenType): Promise<boolean>;
    /**
     * Check if there are suitable user session tokens in the cache
     * @returns {Promise<boolean>} true if tokens found in cache, false otherwise
     */
    hasUserSessionToken(): Promise<boolean>;
    /**
     * Check if there are suitable user bearer tokens in the cache
     * @returns {Promise<boolean>} true if tokens found in cache, false otherwise
     */
    hasUserBearerToken(): Promise<boolean>;
    /**
     * Check if there are suitable service account bearer tokens in the cache
     * @returns {Promise<boolean>} true if tokens found in cache, false otherwise
     */
    hasSaBearerToken(): Promise<boolean>;
    /**
     * Read token
     * @param {tokenType} tokenType type of token
     * @returns {Promise<string>} token or null
     */
    readToken(tokenType: tokenType): Promise<AccessTokenMetaType | UserSessionMetaType>;
    /**
     * Read user session token
     * @returns {Promise<string>} token or null
     */
    readUserSessionToken(): Promise<UserSessionMetaType>;
    /**
     * Read user bearer token
     * @returns {Promise<string>} token or null
     */
    readUserBearerToken(): Promise<AccessTokenMetaType>;
    /**
     * Read service account bearer token
     * @returns {Promise<string>} token or null
     */
    readSaBearerToken(): Promise<AccessTokenMetaType>;
    /**
     * Save user session token for current connection
     * @returns {Promise<boolean>} true if the operation succeeded, false otherwise
     */
    saveUserSessionToken(token: UserSessionMetaType): Promise<boolean>;
    /**
     * Save user bearer token for current connection
     * @returns {Promise<boolean>} true if the operation succeeded, false otherwise
     */
    saveUserBearerToken(token: AccessTokenMetaType): Promise<boolean>;
    /**
     * Save service account bearer token for current connection
     * @returns {Promise<boolean>} true if the operation succeeded, false otherwise
     */
    saveSaBearerToken(token: AccessTokenMetaType): Promise<boolean>;
    /**
     * Purge all expired tokens from cache
     * @returns {TokenCacheInterface} purged cache
     */
    purge(): TokenCacheInterface;
    /**
     * Flush cache
     * @returns {boolean} true if the operation succeeded, false otherwise
     */
    flush(): boolean;
};
type tokenType = 'userSession' | 'userBearer' | 'saBearer';
interface TokenCacheInterface {
    [hostKey: string]: {
        [realmKey: string]: {
            [typeKey in keyof typeKey]: {
                [subjectKey: string]: {
                    [expKey: string]: string;
                };
            };
        };
    };
}

type Version = {
    getVersion(): string;
    getAllVersions(endpoints: {
        base: string;
        path: string;
    }[]): Promise<PromiseSettledResult<any>[]>;
};

type Constants = {
    DEFAULT_REALM_KEY: string;
    CLASSIC_DEPLOYMENT_TYPE_KEY: string;
    CLOUD_DEPLOYMENT_TYPE_KEY: string;
    FORGEOPS_DEPLOYMENT_TYPE_KEY: string;
    DEPLOYMENT_TYPES: string[];
    DEPLOYMENT_TYPE_REALM_MAP: {
        classic: string;
        cloud: string;
        forgeops: string;
    };
    FRODO_METADATA_ID: string;
    FRODO_CONNECTION_PROFILES_PATH_KEY: string;
    FRODO_MASTER_KEY_PATH_KEY: string;
    FRODO_MASTER_KEY_KEY: string;
};

type Base64 = {
    isBase64Encoded(input: any): boolean;
    encodeBase64(input: string, padding?: boolean): string;
    decodeBase64(input: string): string;
    decodeBase64Url(input: string): string;
    encodeBase64Url(input: string): string;
};

type ExportImport = {
    getMetadata(): ExportMetaData;
    titleCase(input: string): string;
    getRealmString(): string;
    convertBase64TextToArray(b64text: string): any[];
    convertBase64UrlTextToArray(b64UTF8Text: string): any[];
    convertTextArrayToBase64(textArray: string[]): string;
    convertTextArrayToBase64Url(textArray: string[]): any;
    validateImport(metadata: any): boolean;
    getTypedFilename(name: string, type: string, suffix?: string): string;
    getWorkingDirectory(mkdirs?: boolean): string;
    getFilePath(fileName: string, mkdirs?: boolean): string;
    saveToFile(type: string, data: object, identifier: string, filename: string, includeMeta?: boolean): void;
    /**
     * Save JSON object to file
     * @param {Object} data data object
     * @param {String} filename file name
     * @param {boolean} includeMeta true to include metadata, false otherwise. Default: true
     * @return {boolean} true if successful, false otherwise
     */
    saveJsonToFile(data: object, filename: string, includeMeta?: boolean): boolean;
    /**
     * Save text data to file
     * @param data text data
     * @param filename file name
     * @return true if successful, false otherwise
     */
    saveTextToFile(data: string, filename: string): boolean;
    /**
     * Append text data to file
     * @param {String} data text data
     * @param {String} filename file name
     */
    appendTextToFile(data: string, filename: string): void;
    /**
     * Find files by name
     * @param {string} fileName file name to search for
     * @param {boolean} fast return first result and stop search
     * @param {string} path path to directory where to start the search
     * @returns {string[]} array of found file paths relative to starting directory
     */
    findFilesByName(fileName: string, fast?: boolean, path?: string): string[];
    /**
     * find all (nested) files in a directory
     *
     * @param directory directory to search
     * @returns list of files
     */
    readFiles(directory: string): Promise<{
        path: string;
        content: string;
    }[]>;
    substituteEnvParams(input: string, reader: Reader): string;
    unSubstituteEnvParams(input: string, reader: Reader): string;
    parseUrl(href: string): any;
    /**
     * Check if a string is a valid URL
     * @param {string} urlString input string to be evaluated
     * @returns {boolean} true if a valid URL, false otherwise
     */
    isValidUrl(urlString: string): boolean;
};

type FRUtils = {
    applyNameCollisionPolicy(name: string): string;
    getRealmPath(realm: string): string;
    getCurrentRealmPath(): string;
    getCurrentRealmName(): string;
    getCurrentRealmManagedUser(): string;
    getRealmName(realm: string): string;
    getHostBaseUrl(url: string): string;
};

type Json = {
    /**
     * Compare two json objects
     * @param {object} obj1 object 1
     * @param {object} obj2 object 2
     * @param {string[]} ignoreKeys array of keys to ignore in comparison
     * @returns {boolean} true if the two json objects have the same length and all the properties have the same value
     */
    isEqualJson(obj1: object, obj2: object, ignoreKeys?: string[]): boolean;
    /**
     * Deep delete keys and their values from an input object. If a key in object contains substring, the key an its value is deleted.
     * @param {Object} object input object that needs keys removed
     * @param {String} substring substring to search for in key
     * @returns the modified object without the matching keys and their values
     */
    deleteDeepByKey(object: any, substring: any): any;
    /**
     * Deep clone object
     * @param {any} obj object to deep clone
     * @returns {any} new object cloned from obj
     */
    cloneDeep(obj: any): any;
    /**
     * Deep merge two objects
     * @param obj1 first object
     * @param obj2 second object
     * @returns merged first and second object
     */
    mergeDeep(obj1: any, obj2: any): any;
    /**
     * Get all paths for an object
     * @param {any} o object
     * @param {string} prefix prefix (path calculated up to this point). Only needed for recursion or to add a global prefix to all paths.
     * @param {string} delim delimiter used to separate elements of the path. Default is '.'.
     * @returns {string[]} an array of paths
     */
    getPaths(o: any, prefix?: string, delim?: string): string[];
    findInArray(objs: any[], predicate: any): any;
    get(obj: any, path: string[], defaultValue?: any): any;
    put(obj: any, value: any, path: string[]): any;
    /**
     * Deterministic stringify
     * @param {any} obj json object to stringify deterministically
     * @returns {string} stringified json object
     */
    stringify(obj: any): string;
};

type ScriptValidation = {
    validateScriptHooks(jsonData: object): void;
    validateScript(scriptData: ScriptSkeleton): void;
    validateJs(javascriptSource: string): void;
    areScriptHooksValid(jsonData: object): boolean;
    isScriptValid(scriptData: ScriptSkeleton): boolean;
    isValidJs(javascriptSource: string): boolean;
};

/**
 * Frodo Library
 */
type Frodo = {
    state: State;
    admin: Admin;
    agent: Agent;
    app: Application;
    authn: {
        journey: Journey;
        node: Node;
        settings: AuthenticationSettings;
    };
    authz: {
        policy: Policy;
        policySet: PolicySet;
        resourceType: ResourceType;
    };
    cloud: {
        adminFed: AdminFederation;
        feature: Feature;
        log: Log;
        secret: Secret;
        serviceAccount: ServiceAccount;
        startup: Startup;
        variable: Variable;
    };
    config: Config;
    conn: ConnectionProfile;
    cache: TokenCache;
    email: {
        template: EmailTemplate;
    };
    idm: {
        config: IdmConfig;
        connector: Connector;
        managed: ManagedObject;
        mapping: Mapping;
        organization: Organization;
        recon: Recon;
        system: IdmSystem;
    };
    info: Info;
    login: Authenticate;
    oauth2oidc: {
        client: OAuth2Client;
        endpoint: OAuth2Oidc;
        external: Idp;
        provider: OAuth2Provider;
        issuer: OAuth2TrustedJwtIssuer;
    };
    realm: Realm;
    saml2: {
        circlesOfTrust: CirclesOfTrust;
        entityProvider: Saml2;
    };
    script: Script;
    service: Service;
    session: Session;
    theme: Theme;
    utils: FRUtils & ScriptValidation & ExportImport & Base64 & {
        constants: Constants;
        jose: Jose;
        json: Json;
        version: Version;
    };
    /**
     * Create a new frodo instance
     * @param {StateInterface} config Initial state configuration to use with the new instance
     * @returns {Frodo} frodo instance
     */
    createInstance(config: StateInterface): Frodo;
    /**
     * Factory helper to create a frodo instance ready for logging in with an admin user account
     * @param {string} host host base URL, e.g. 'https://openam-my-tenant.forgeblocks.com/am'
     * @param {string} username admin account username
     * @param {string} password admin account password
     * @param {string} realm (optional) override default realm
     * @param {string} deploymentType (optional) override deployment type ('cloud', 'forgeops', or 'classic')
     * @param {boolean} allowInsecureConnection (optional) allow insecure connection
     * @param {boolean} debug (optional) enable debug output
     * @param {boolean} curlirize (optional) enable output of all library REST calls as curl commands
     * @returns {Frodo} frodo instance
     */
    createInstanceWithAdminAccount(host: string, username: string, password: string, realm?: string, deploymentType?: string, allowInsecureConnection?: boolean, debug?: boolean, curlirize?: boolean): Frodo;
    /**
     * Factory helper to create a frodo instance ready for logging in with a service account
     * @param {string} host host base URL, e.g. 'https://openam-my-tenant.forgeblocks.com/am'
     * @param {string} serviceAccountId service account uuid
     * @param {string} serviceAccountJwkStr service account JWK as stringified JSON
     * @param {string} realm (optional) override default realm
     * @param {string} deploymentType (optional) override deployment type ('cloud', 'forgeops', or 'classic')
     * @param {boolean} allowInsecureConnection (optional) allow insecure connection
     * @param {boolean} debug (optional) enable debug output
     * @param {boolean} curlirize (optional) enable output of all library REST calls as curl commands
     * @returns {Frodo} frodo instance
     */
    createInstanceWithServiceAccount(host: string, serviceAccountId: string, serviceAccountJwkStr: string, realm?: string, deploymentType?: string, allowInsecureConnection?: boolean, debug?: boolean, curlirize?: boolean): Frodo;
};
/**
 * Default frodo instance
 *
 * @remarks
 *
 * If your application requires a single connection to a ForgeRock Identity Platform
 * instance at a time, then this default instance is all you need:
 *
 * In order to use the default {@link Frodo | frodo} instance, you must populate its {@link State | state} with the
 * minimum required information to login to your ForgeRock Identity Platform instance:
 *
 * ```javascript
 * // configure the state before invoking any library functions that require credentials
 * state.setHost('https://instance0/am');
 * state.setUsername('admin');
 * state.setPassword('p@ssw0rd!');
 *
 * // now the library can login
 * frodo.login.getTokens();
 *
 * // and perform operations
 * frodo.authn.journey.exportJourney('Login');
 * ```
 *
 * If your application needs to connect to multiple ForgeRock Identity Platform instances
 * simultaneously, then you will want to create additional frodo instances using any of
 * the available factory methods accessible from the default instance:
 *
 * {@link frodo.createInstance}
 * ```javascript
 * // use factory method to create a new Frodo instance
 * const instance1 = frodo.createInstance({
 *    host: 'https://instance1/am',
 *    username: 'admin',
 *    password: 'p@ssw0rd!',
 * });
 *
 * // now the instance can login
 * instance1.login.getTokens();
 *
 * // and perform operations
 * instance1.authn.journey.exportJourney('Login');
 * ```
 *
 * {@link frodo.createInstanceWithAdminAccount}
 * ```javascript
 * // use factory method to create a new Frodo instance ready to login with an admin user account
 * const instance2 = frodo.createInstanceWithAdminAccount(
 *   'https://instance2/am',
 *   'admin',
 *   'p@ssw0rd!'
 * );
 *
 * // now the instance can login
 * instance2.login.getTokens();
 *
 * // and perform operations
 * instance2.authn.journey.exportJourney('Login');
 * ```
 *
 * {@link frodo.createInstanceWithServiceAccount}
 * ```javascript
 * // use factory method to create a new Frodo instance ready to login with a service account
 * const instance3 = frodo.createInstanceWithServiceAccount(
 *   'https://instance3/am',
 *   'serviceAccount',
 *   '{"k":"jwk"}'
 * );
 *
 * // now the instance can login
 * instance3.login.getTokens();
 *
 * // and perform operations
 * instance3.authn.journey.exportJourney('Login');
 * ```
 */
declare const frodo: Frodo;
/**
 * Default state instance
 *
 * @remarks
 *
 * {@link Frodo} maintains a {@link State | state} for each instance. The state is where Frodo gets configuration
 * information from like host to connecto to, username and password to use, whether to
 * allow insecure connections or not, etc. As the library operates, it updates its state.
 *
 * The default frodo instance contains an empty state instance by default. In order to
 * use the default frodo instance, you must populate its state with the minimum required
 * information to login to your ForgeRock Identity Platform instance:
 *
 * ```javascript
 * // configure the state before invoking any library functions that require credentials
 * state.setHost('https://instance0/am');
 * state.setUsername('admin');
 * state.setPassword('p@ssw0rd!');
 *
 * // now the library can login
 * frodo.login.getTokens();
 *
 * // and perform operations
 * frodo.authn.journey.exportJourney('Login');
 * ```
 */
declare const state: State;

declare class FrodoError extends Error {
    originalErrors: Error[];
    isHttpError: boolean;
    httpCode: string;
    httpStatus: number;
    httpMessage: string;
    httpDetail: string;
    httpErrorText: string;
    httpErrorReason: string;
    httpDescription: string;
    constructor(message: string, originalErrors?: Error | Error[]);
    getOriginalErrors(): Error[];
    getCombinedMessage(): string;
    toString(): void;
}

export { FrodoError, frodo, state };
