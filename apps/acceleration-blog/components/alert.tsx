import Container from './container';
import cn from 'classnames';

const Alert = () => {
  return (
    <div
      className={cn('border-b', {
        'bg-neutral-50 border-neutral-200': true,
      })}
    >
      <Container>
        <div className="py-2 text-center text-sm">
          {/* You can place a new message here or leave it empty */}
        </div>
      </Container>
    </div>
  );
}

export default Alert;
