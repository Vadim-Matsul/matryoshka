import { cn } from '@/utils/cn';

type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & {
  containerCN?: string;
  checkmarkBoxSize?: number;
  error?: boolean;
};

export function CustomCheckbox({
  className,
  disabled,
  error,
  containerCN = '',
  checkmarkBoxSize = 14,
  ...props
}: CheckboxProps) {

  return (
    <label
      className={cn(
        "inline-flex items-center justify-center relative select-none",
        'w-6 h-6 min-w-6 min-h-6 max-w-6 max-h-6',
        containerCN
      )}
    >
      <input
        type="checkbox"
        disabled={disabled}
        data-error={error ? "true" : undefined}
        className={cn(
          "peer appearance-none w-full h-full rounded-[4px] outline-none",
          "transition-colors duration-150",
          'cursor-pointer',
          // DEFAULT+UNCHECKED
          "border",
          "border-custom-grey-200 bg-transparent",
          // DEFAULT+CHECKED
          "checked:bg-custom-brand-100 checked:border-custom-brand-100",
          // HOVER+UNCHECKED
          "hover:border-custom-brand-100",
          // HOVER+CHECKED
          "checked:hover:bg-custom-brand-100 checked:hover:border-custom-brand-100",
          // FOCUS+UNCHECKED
          "focus-visible:ring-[1px] focus:ring-offset-[1px] focus-visible:ring-custom-brand-100 focus-visible:border-custom-brand-100",
          // FOCUS+CHECKED
          "checked:focus-visible:ring-[1px] checked:focus:ring-offset-[1px] checked:focus-visible:ring-custom-brand-100 checked:focus-visible:border-custom-brand-100",
          // DISABLED+UNCHECKED
          "disabled:bg-transparent disabled:border-custom-grey-100",
          // DISABLED+CHECKED
          "checked:disabled:bg-custom-white-000 checked:disabled:border-custom-grey-100",
          "disabled:cursor-not-allowed",

          // ==== ERROR СТИЛИ ====
          error && [
            // Unchecked Error
            "border-error",
            // Checked Error
            "checked:border-error checked:bg-error",
            // Hover/Error
            "hover:border-error",
            "checked:hover:border-error checked:hover:bg-error",
            // Focus/Error
            "focus-visible:ring-error focus-visible:border-error",
            "checked:focus-visible:ring-error checked:focus-visible:border-error",
          ],
          "data-[error=true]:border-error",
          "data-[error=true]:focus-visible:border-error",
          "data-[error=true]:focus-visible:ring-error",
          "data-[error=true]:hover:border-error",
          "checked:data-[error=true]:border-error",
          "checked:data-[error=true]:hover:border-error",
          "checked:data-[error=true]:focus-visible:border-error",
          className
        )}
        {...props}
      />

      <span
        className={cn(
          "pointer-events-none absolute left-0 top-0 w-full h-full flex items-center justify-center",
          "opacity-0 peer-checked:opacity-100 transition-opacity duration-150",
          "peer-disabled:peer-checked:text-custom-grey-200",
          "peer-checked:text-custom-white-000"
        )}
      >
        <svg
          style={{
            width: checkmarkBoxSize
          }}
          fill="none"
          viewBox="0 0 14 11"
          className='aspect-[1.27/1]'
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M14.158 2.086a1.264 1.264 0 0 0 0-1.728 1.13 1.13 0 0 0-1.65 0L5.167 8.049 2.492 5.247a1.13 1.13 0 0 0-1.65 0 1.264 1.264 0 0 0 0 1.728l3.5 3.667a1.13 1.13 0 0 0 1.65 0z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    </label>
  );
}
