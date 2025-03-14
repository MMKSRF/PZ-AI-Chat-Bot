import PropTypes from 'prop-types';


// This the place of the box where all the llm types are stored.
function LlmBox({children}) {
  return (
    <div  className="w-3/10 min-w-[240px] p-4  dark:border-gray-700 flex flex-col gap-1">
          {children}
          
    </div>
  )
};

LlmBox.propTypes = {
    children: PropTypes.node.isRequired,
}
export default LlmBox
