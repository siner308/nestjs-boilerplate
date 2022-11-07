type CommonError = {
  code: string;
  description: string;
};

type CriticalError = {
  code: string;
  description: string;
  unexpected: boolean;
};

export const InvalidContentError: CriticalError = {
  code: 'INVALID_CONTENT_ERROR',
  description: "content에 '에러'가 있습니다",
  unexpected: true,
};

export const NotFoundTodoError: CommonError = {
  code: 'NOT_FOUND_TODO_ERROR',
  description: '없어유',
};
