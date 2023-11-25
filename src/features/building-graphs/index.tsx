import React, { useEffect, useState } from 'react';

import { useQuery } from 'react-query';
import axios from 'axios';
import { BuildingInfo } from '@/types';
import { API_URL } from '@/constants';
import { BuildingGraphsContainer } from '@/containers/BuildingGraphsContainer';
import { Body1, Button, Card, CardFooter, CardHeader, CardPreview, Title3 } from '@fluentui/react-components';
import { ArrowLeftFilled, ArrowRightFilled } from '@fluentui/react-icons';

import classes from './styles.module.css';


type BuildingGraphsProps = {
  id?: string;
}

type ChartMeta = {
  name: string;
};

const chartMeta: ChartMeta[] = [{
  name: 'Prediction for 3 years',
}, {
  name: 'Weather temperature',
}, {
  name: 'Precipitation',
}];

export const BuildingGraphs = ({ id }: BuildingGraphsProps) => {
  const [currentChart, setCurrentChart] = useState<number>(0);
  const onNextButtonClick = () => {
    setCurrentChart(prevState => (prevState + 1) % chartMeta.length);
  };

  const onPrevButtonClick = () => {
    setCurrentChart(prevState => (prevState - 1) % chartMeta.length);
  };
  const { isLoading, isError, data, refetch } = useQuery({
      queryKey: ['building', id],
      queryFn: () => axios.get<BuildingInfo[]>(`${API_URL}/buildings/${id}`).then(({ data }) => data),
      enabled: false,
    },
  );

  useEffect(() => {
    if (id) {
      refetch();
    }
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>An error occurred while building by id request</div>;
  }

  return <div className={classes.container}>
    <Card className={classes.card}>
      <CardHeader
        header={
          <Body1>
            <b>
              {id ? chartMeta[currentChart].name : ''}
            </b>
          </Body1>
        }
      />

      <CardPreview>
        {data ? <BuildingGraphsContainer
            buildingInfo={data}
            currentChart={currentChart} />
          : <div className={classes.card_emptyText}>
            <Title3>Choose building</Title3>
          </div>}
      </CardPreview>

      <CardFooter>
        <Button
          disabled={!id || currentChart === 0}
          icon={<ArrowLeftFilled fontSize={16} />}
          onClick={onPrevButtonClick}>
          Previous
        </Button>

        <Button
          disabled={!id || currentChart === chartMeta.length - 1}
          icon={<ArrowRightFilled fontSize={16} />}
          iconPosition='after'
          onClick={onNextButtonClick}>
          Next
        </Button>
      </CardFooter>
    </Card>
  </div>;
  ;
};