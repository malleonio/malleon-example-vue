import { TagType, ReplayTag, ReplayUserData } from "./types/replay-types";
declare global {
    interface Window {
        __REPLAY_STARTED__?: boolean;
        __REPLAY_DISABLED__?: boolean;
        __replay__appId?: string;
        addTagsToReplay?: typeof addTagsToReplay;
        addTagToReplay?: typeof addTagToReplay;
        updateReplayUserData?: typeof updateReplayUserData;
        trackStateTransition?: typeof trackStateTransition;
    }
}
export declare function initReplay(appId: string, options?: {
    release?: string;
    dist?: string;
}): void;
export declare function addTagsToReplay(tags: ReplayTag[]): Promise<void>;
export declare function addTagToReplay(name: string, value: string | number | boolean | Date, type: TagType): Promise<void>;
export declare function updateReplayUserData(userData: ReplayUserData): Promise<void>;
export declare function trackStateTransition(from: string, to: string, trigger: string): void;
export type { TagType, ReplayTag, ReplayUserData } from "./types/replay-types";
