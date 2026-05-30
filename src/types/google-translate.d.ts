export {};

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate: {
        TranslateElement: {
          new (
            options: {
              pageLanguage: string;
              includedLanguages?: string;
              autoDisplay?: boolean;
              layout?: number;
            },
            elementId: string,
          ): void;
          InlineLayout: {
            SIMPLE: number;
          };
        };
      };
    };
  }
}
