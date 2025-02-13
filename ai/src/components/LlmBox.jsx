import PropTypes from 'prop-types';

function LlmBox({children}) {
  return (
    <button onClick={(console.log("hi"))} className="w-3/10 min-w-[240px] p-4  dark:border-gray-700 flex flex-col gap-1">
          {children}
    </button>
  )
};

LlmBox.propTypes = {
    children: PropTypes.node.isRequired,
}
export default LlmBox
