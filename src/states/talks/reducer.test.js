import { describe, expect, it } from 'vitest';
import talksReducer from './reducer';

describe('talksReducer', () => {
  it('should return the initial state when given by unknown action', () => {
    // Arrange
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    // Act
    const nextState = talksReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the talks when given RECEIVE_TALKS action', () => {
    const initialState = [];
    const action = {
      type: 'RECEIVE_TALKS',
      payload: {
        talks: [
          {
            id: 'talk-1',
            text: 'Talk Test 1',
            user: 'user-1',
            replyTo: '',
            likes: [],
            createdAt: '2022-09-22T10:06:55.588Z',
          },
          {
            id: 'talk-2',
            text: 'Talk Test 2',
            user: 'user-2',
            replyTo: '',
            likes: [],
            createdAt: '2022-09-22T10:06:55.588Z',
          },
        ],
      },
    };

    const nextState = talksReducer(initialState, action);

    expect(nextState).toEqual(action.payload.talks);
  });

  it('should return the talks with new talk when given ADD_TALK action', () => {
    const initialState = [{
      id: 'talk-1',
      text: 'Talk Test 1',
      user: 'user-1',
      replyTo: '',
      likes: [],
      createdAt: '2022-09-22T10:06:55.588Z',
    }];
    const action  = {
      type: 'ADD_TALK',
      payload: {
        talk: {
          id: 'talk-2',
          text: 'Talk Test 2',
          user: 'user-2',
          replyTo: '',
          likes: [],
          createdAt: '2022-09-22T10:06:55.588Z',
        }
      }
    };

    const nextState = talksReducer(initialState, action);

    expect(nextState).toEqual([action.payload.talk, ...initialState]);
  });

  it('should return the talks with the toggled like talk when given TOGGLE_LIKE_TALK action', () => {
    const initialState = [{
      id: 'talk-1',
      text: 'Talk Test 1',
      user: 'user-1',
      replyTo: '',
      likes: [],
      createdAt: '2022-09-22T10:06:55.588Z',
    }];
    const action = {
      type: 'TOGGLE_LIKE_TALK',
      payload: {
        talkId: 'talk-1',
        userId: 'user-1',
      }
    };

    const nextState = talksReducer(initialState, action);

    expect(nextState).toEqual([{
      ...initialState[0],
      likes: [action.payload.userId]
    }]);
  });
});