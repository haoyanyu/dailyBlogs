import { useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import classnames from 'classnames';

import { selectTodos, addTodo } from "../../store/todos"

import styles from './index.module.scss';

export function Todos() {
  const { todos, status } = useSelector(selectTodos);
  const dispatch = useDispatch();

  const [taskDesc, setTaskDesc] = useState('');
  const handleEnter = (e: KeyboardEvent) => {
    const { key, target } = e;
    if (key.toLowerCase() === 'enter') {
      const { value = '' } = target || {};
      if (value.trim()) {
        dispatch(addTodo(value));
        // 清空输入框
        setTaskDesc('');
      }
    }
  }
  return (
    <div className={styles['todo-list_page']}>
      <div className={styles['todo-list_field']}>
        <div className={styles['label-wrapper']}>
          <div className={styles['input-wrapper']}>
            <input
              className={styles['input']}
              placeholder="任务描述"
              type="text"
              aria-label="task description"
              value={taskDesc}
              onChange={(e) => setTaskDesc(e.target.value)}
              onKeyUp={(e) => handleEnter(e)}
            />
          </div>
        </div>
      </div>
      <div className={styles["todo-list_container"]}>
        <ol className={styles["todo-list_item"]}>
          {
            todos.map((todo: any) => {
              return (
                <li key={todo.text} className={classnames(styles['todo-list_item-inner'], { [styles.selected]: todo.completed })}>
                  <div className={styles["selectable-tag-image-container"]} style={{color: 'rgb(255, 204, 0)'}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="7" viewBox="0 0 10 7" className={styles["selectable-tag-image"]} style={{fill: 'rgb(255, 255, 255)'}}><path d="M1.22 3.005a.725.725 0 0 0-1.01 0 .69.69 0 0 0 0 .99l2.856 2.8a.725.725 0 0 0 1.01 0l5.715-5.6a.69.69 0 0 0 0-.99.725.725 0 0 0-1.01 0L3.57 5.31z"></path></svg>
                  </div>
                  <span className={styles["tag-text"]}>
                    {todo.text}
                  </span>
                </li>
              )
            })
          }
        </ol>
      </div>
    </div>
    
  )
}