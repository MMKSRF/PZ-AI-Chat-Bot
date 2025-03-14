import PropTypes from 'prop-types';

const Button = ({
  children,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  variant = 'primary',
  size = 'medium',
  icon,
  iconPosition = 'left',
  loading = false,
  loadingText = 'Loading...',
  ...rest
}) => {
  const baseStyles = 'font-semibold rounded focus:outline-none transition-all duration-200';
  const sizeStyles = {
    small: 'px-3 py-1 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
  };
  const variantStyles = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500',
    secondary: 'bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-500',
    success: 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-500',
    danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500',
    warning: 'bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-500',
    info: 'bg-indigo-500 text-white hover:bg-indigo-600 focus:ring-indigo-500',
    light: 'bg-gray-100 text-gray-700 hover:bg-gray-400 focus:ring-gray-100',
    lightGray: 'bg-gray-500 text-black hover:bg-gray-400 focus:ring-gray-100',
    dark: 'text-black hover:bg-gray-600 bg-gray-700  focus:ring-gray-800 active:bg-gray-300',
  };

  // ...existing code...

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...rest}
    >
      {loading ? (
        <>
          <span className="spinner" /> {loadingText}
        </>
      ) : (
        <>
          {icon && iconPosition === 'left' && <span className="icon-left">{icon}</span>}
          {children}
          {icon && iconPosition === 'right' && <span className="icon-right">{icon}</span>}
        </>
      )}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark','lightGray']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  icon: PropTypes.node,
  iconPosition: PropTypes.oneOf(['left', 'right']),
  loading: PropTypes.bool,
  loadingText: PropTypes.string,
};

export default Button;

/*

Props Explanation:
children: The content inside the button (usually text).

onClick: Function to be called when the button is clicked.

type: The type of the button (button, submit, reset).

disabled: Whether the button is disabled.

className: Additional custom classes to be applied to the button.

variant: The color variant of the button (primary, secondary, success, danger, warning, info, light, dark).

size: The size of the button (small, medium, large).

icon: An optional icon to be displayed inside the button.

iconPosition: The position of the icon relative to the text (left, right).

loading: Whether the button is in a loading state.

loadingText: The text to display when the button is in a loading state.

...rest: Any other props that you might want to pass to the button (e.g., aria-* attributes).


*/