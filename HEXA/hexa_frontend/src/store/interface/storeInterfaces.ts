interface AuthState {
  accessToken: string | null;
  email: string | null;
}

interface ContentState {
  expanded?: boolean;
  subMenuOpened?: boolean;
}

interface CounterState {
  value: number;
}

interface RootState {
  content: ContentState;
}

export type { AuthState, ContentState, CounterState, RootState };
