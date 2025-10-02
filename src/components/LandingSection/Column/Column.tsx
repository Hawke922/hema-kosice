import classes from './Column.module.css'

type ColumnProps = {
  imagePath: string;
  type: 'left' | 'center' | 'right';
};

const Column = ({imagePath, type}: ColumnProps) => {
  return (
    <div className={classes.column}>
      <img className={`${classes.column__image} ${classes[`column--${type}`]}`} src={imagePath} alt="Column" />      
    </div>
  );
};

export default Column;