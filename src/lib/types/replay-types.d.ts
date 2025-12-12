import { ReplayEventEntry } from "./event-types";
import { ReplayRequestEntry } from "./request-types";
import { ResourceEntry, LogEntry } from "../data/replay-init-data";
import { BehavioralMetadata } from "./behavioral-types";
export type TagType = 'STR' | 'LARGE_STR' | 'NUM' | 'DATETIME' | 'BOOL';
export interface ReplayTag {
    name: string;
    value: string | number | boolean | Date;
    type: TagType;
}
export interface ReplayUserData {
    appId?: string;
    userId?: string;
    username?: string;
    userEmail?: string;
    userRole?: string;
    userStatus?: string;
    environment?: string;
    tenantId?: string;
    tenantType?: string;
    userType?: string;
}
export interface UnifiedReplayData {
    appId: string;
    replayId: string;
    events: ReplayEventEntry[] | null;
    requests: ReplayRequestEntry[] | null;
    resources: ResourceEntry[] | null;
    logs: LogEntry[] | null;
    behavioralMetadata: BehavioralMetadata | null;
}
