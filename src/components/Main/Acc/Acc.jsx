import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  accounIdAsuncRequest,
  infoIdClearRequest,
} from '../../../store/ext/extAction';
import formatDate from '../../../utils/formatDate';
import style from './Acc.module.scss';
import { Line } from 'react-chartjs-2';
import Loader from '../../../Loader';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import Translation from './Translation';
import { Table } from './Table/Table';
import { graphList } from '../../../utils/GrafList';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
      width: '580px',
      height: '312px',
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

export const Acc = (props) => {
  const labels = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ];

  const { page } = useParams();
  const infoCart = useSelector((state) => state.ext.infoCart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { account, transactions = [] } = infoCart;
  const lastTransaction = transactions.splice(-9);
  let list = graphList(transactions);

  const data = {
    labels,
    datasets: [
      {
        label: 'Динамика',
        data: list.map((item) => {
          return item.count;
        }),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  useEffect(() => {
    dispatch(accounIdAsuncRequest(page));
  }, [page]);

  const handleOut = (e) => {
    navigate('/main');
    dispatch(infoIdClearRequest());
  };

  return (
    <>
      {transactions && account ? (
        <div className={style.container}>
          <div className={style.header}>
            <h2 className="title">Счет {account}</h2>
            <button
              className={'btn ' + style.btn}
              onClick={(e) => {
                handleOut();
              }}
            >
              Вернуться
            </button>
          </div>
          <div className={style.block}>
            <Line className={style.graph} options={options} data={data} />
            <h3 className={style.table__title}> История переводов</h3>
            <div className={style.transactions}>
              <Table data={lastTransaction} />
            </div>
          </div>
          <h2 className="title">Перевод</h2>
          <Translation id={account} />
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};
