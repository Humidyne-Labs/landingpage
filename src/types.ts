export type LegalDocKey = 'terms' | 'privacy' | 'community';

export type PageView = 'home' | 'legal';

export interface LegalDocMetadata {
  id: LegalDocKey;
  title: string;
  filename: string;
  effectiveDate: string;
  jurisdiction: string;
}
