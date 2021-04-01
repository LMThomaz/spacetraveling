import styles from './styles.module.scss';

export default function ButtonPreview(): JSX.Element {
  return (
    <button type="button" className={styles.container}>
      Sair do modo Preview
    </button>
  );
}
