const CheckBox = (props: { checked: boolean }) => {
  return <input type='checkbox' checked={props.checked} />;
};

export default CheckBox;
