import styles from './Content.module.scss';

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className={styles.content}>
      {children}
    </div>
  );
};

export default Container;