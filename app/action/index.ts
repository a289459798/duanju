export interface RequestType<Type> {
  onSuccess?: (t: Type) => void;
  onError?: (err: string) => void;
  onComplete?: () => void;
}
