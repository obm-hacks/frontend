import React, { useState } from 'react';
import { BuildingModelForm } from '@/features/building-model/ui/model-form/container';

import classes from './styles.module.css';
import { SelectTabData, Tab, TabList, TabValue } from '@fluentui/react-components';
import { Buildings } from '@/features/buildings';


export const MainPage = () => {
  const [currentTab, setCurrentTab] = useState<TabValue>('buildings');
  return <div className={classes.wrapper}>
    <div className={classes.tabs}>
      <TabList
        size='large'
        selectedValue={currentTab}
        onTabSelect={(_, data: SelectTabData) => setCurrentTab(data.value)}>

        <Tab value='buildings'>Buildings</Tab>


        <Tab value='form'>Predict</Tab>

      </TabList>
    </div>

    {currentTab === 'form' && <BuildingModelForm />}

    {currentTab === 'buildings' && <Buildings />}



  </div>;
};