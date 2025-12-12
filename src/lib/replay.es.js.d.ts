// Type declarations for local replay SDK
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

export declare function initReplay(appId: string, options?: {
  release?: string;
  dist?: string;
}): void;

export declare function addTagsToReplay(tags: ReplayTag[]): Promise<void>;

export declare function addTagToReplay(
  name: string,
  value: string | number | boolean | Date,
  type: TagType
): Promise<void>;

export declare function updateReplayUserData(userData: ReplayUserData): Promise<void>;

export declare function trackStateTransition(from: string, to: string, trigger: string): void;
