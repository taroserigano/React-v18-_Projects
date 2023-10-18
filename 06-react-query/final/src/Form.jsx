import { useState } from 'react';
import { useCreateTask } from './reactQueryCustomHooks';

const Form = () => {
  const [newItemName, setNewItemName] = useState('');

  const { isLoading, createTask } = useCreateTask();

  const handleSubmit = (e) => {
    e.preventDefault();
    // 1. add task and 2. clean up 
    createTask(newItemName, {
      onSuccess: () => {
        setNewItemName('');
      },
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <h4>task bud</h4>
      <div className='form-control'>
        <input
          type='text '
          className='form-input'
          value={newItemName}
          onChange={(event) => setNewItemName(event.target.value)}
        />
        <button type='submit' className='btn' disabled={isLoading}>
          add task
        </button>
      </div>
    </form>
  );
};
export default Form;
