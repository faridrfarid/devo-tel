export function InputInlineError({ error }: { error?: string }) {
  return (error?.length || 0) > 0 ? (
    <label
      className={'text-xs mt-1 text-red-500'}
      dangerouslySetInnerHTML={{ __html: error || '' }}
    />
  ) : (
    <></>
  );
}
