export type Errors = {
  errors: {
    [key: string]: string[] | undefined;
  };
};

export type ActionResponse<T> =
  | { success: true; data: T; errors?: never }
  | {
      success: false;
      errors: { [key: string]: string[] | undefined };
      data?: never;
    }
  | null;
