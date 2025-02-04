import spinner from '@assets/spinner.svg';
import './loading.scss';

export default function Loading() {
  return (
    <div className="loading">
      <img src={spinner} alt="Loading..." className="spinner" />
    </div>
  );
}
