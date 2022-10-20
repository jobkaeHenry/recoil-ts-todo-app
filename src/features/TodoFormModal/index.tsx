import React, { useState } from 'react';
import styled from '@emotion/styled/macro';
import Modal from '../../components/Modal';
import { useRecoilValue, useRecoilState, useRecoilCallback} from 'recoil';
import { selectedDateState, todoListState } from './../TodoList/atom';
import { TodoFormModalOpenState } from './atom';
import {v4 as uuidv4} from "uuid"
import { getSimpleDateFormat } from '../../utils';

const Container = styled.div`
  width: 100vw;
  max-width: 386px;
  padding: 8px;
`;

const Date = styled.small`
  display: block;
  color: #C9C8CC;
`;

const InputTodo = styled.input`
  padding: 16px 24px;
  border: none;
  width: 100%;
  box-sizing: border-box;
  background-color: transparent;
  color: #C9C8CC;
  caret-color: #C9C8CC;
`;

const Card = styled.div`
  width: 100%;
  max-width: 370px;
  border-radius: 16px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  padding: 24px;
  box-sizing: border-box;
  background-color: #19181A;
  ${Date} + ${InputTodo} {
    margin-top: 24px;
  };
`;

const TodoFormModal: React.FC = () => {
  const [todo,setTodo] = useState<string>("")

  const selectedDate =useRecoilValue(selectedDateState)
  const todoList = useRecoilValue(todoListState)

  const [isOpen, setIsOpen]= useRecoilState(TodoFormModalOpenState)
  
  const handleClose = () => setIsOpen(false);
  const reset = ()=>{
    setTodo("")
  }
  
  const addTodo = useRecoilCallback(({snapshot,set})=>()=>{
    const todoList = snapshot.getLoadable(todoListState).getValue()
    const newTodo = {id:uuidv4(),content:"",done:false,date:selectedDate}

    set(todoListState,[...todoList,newTodo]);
  },[todo,selectedDate,todoList])

  const handleKeyPress = (e:React.KeyboardEvent<HTMLInputElement>)=>{
    if(e.key === 'Enter'){
      addTodo();
      reset()
      handleClose()
    }
  }

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setTodo(e.target.value)
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <Container>
        <Card>
          <Date>{getSimpleDateFormat(selectedDate)}</Date>
          <InputTodo placeholder="새로운 이벤트" onChange={handleChange} onKeyDown={handleKeyPress}/>
        </Card>
      </Container>
    </Modal>
  )
}

export default TodoFormModal;