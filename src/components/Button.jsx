const Button = (props) => {
  return (
    <button
      {...props}
      className='px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer'
    >
      {props.children}
    </button>
  )
}

export default Button
