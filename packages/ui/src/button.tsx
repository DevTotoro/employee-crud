export const Button = () => {
  return (
    <button
      className='ui-bg-blue-500'
      onClick={() => {
        console.log('hi');
      }}
    >
      Click me
    </button>
  );
};
