type Props = {
  setPage: (page: number) => number;
  page: number;
};

export const nextPage = ({ setPage, page }: Props) => {
  setPage(page + 50);
};

export const previousPage = ({ setPage, page }: Props) => {
  setPage(Math.max(0, page - 50));
};
