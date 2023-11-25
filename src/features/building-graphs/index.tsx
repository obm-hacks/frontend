import React, { useState } from 'react';

import { TBuildingInfo } from '@/types';
import { BuildingGraphsContainer } from '@/containers/BuildingGraphsContainer';
import { Body1, Button, Card, CardFooter, CardHeader, CardPreview, Title3 } from '@fluentui/react-components';
import { ArrowLeftFilled, ArrowRightFilled } from '@fluentui/react-icons';

import classes from './styles.module.css';


type BuildingGraphsProps = {
  isLoading: boolean;
  isError: boolean;
  data?: TBuildingInfo[];
  emptyText: string;
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

type GetCardText = {
  isLoading: boolean;
  isError: boolean;
  emptyText: string;
}

const getCardText = ({ isLoading, emptyText, isError }: GetCardText): string => {
  if (isLoading) {
    return 'Loading...';
  }

  if (isError) {
    return 'No data found';
  }

  return emptyText;
};

export const BuildingGraphs = ({ isLoading, data, isError, emptyText }: BuildingGraphsProps) => {
  const [currentChart, setCurrentChart] = useState<number>(0);
  const onNextButtonClick = () => {
    setCurrentChart(prevState => (prevState + 1) % chartMeta.length);
  };

  const onPrevButtonClick = () => {
    setCurrentChart(prevState => (prevState - 1) % chartMeta.length);
  };

  return <div className={classes.container}>
    <Card className={classes.card}>
      <CardHeader
        header={
          <Body1>
            <b>
              {data ? chartMeta[currentChart].name : ''}
            </b>
          </Body1>
        }
      />

      <CardPreview>
        {data ? <BuildingGraphsContainer
            buildingInfo={data}
            currentChart={currentChart} />
          : <div className={classes.card_emptyText}>
            <Title3>
              {getCardText({ emptyText, isError, isLoading })}
            </Title3>
          </div>}
      </CardPreview>

      <CardFooter>
        <Button
          disabled={!data || currentChart === 0}
          icon={<ArrowLeftFilled fontSize={16} />}
          onClick={onPrevButtonClick}>
          Previous
        </Button>

        <Button
          disabled={!data || currentChart === chartMeta.length - 1}
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