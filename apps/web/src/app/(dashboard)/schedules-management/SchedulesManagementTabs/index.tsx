'use client';

import { Button, Cascader, Popover } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import {
  EventType,
  GroupData,
  ListGroupsProps,
  ListScheduledEventsProps,
  formatDateToISO8601,
} from 'api-client';
import { useEffect, useState } from 'react';
import { useListGroups } from '../../../../hooks/useListGroups';
import { useListScheduledEvents } from '../../../../hooks/useListScheduledEvents';
import Calendar, { getEventColor } from '../../../components/Calendar';
import ScheduleEventForm from './partials/ScheduleEventForm.tsx';
import styles from './styles.module.scss';

interface Group {
  value: string;
  label: string;
  disabled?: boolean;
}

export default function SchedulesManagementTabs({}) {
  // Fake Data
  const dateA = new Date();

  const dateB = new Date();
  dateB.setDate(dateB.getDate() + 7);

  const dateC = new Date();
  dateC.setDate(dateC.getDate() + 9);

  const trainings = [
    { title: 'Anthony FOUBRO', date: dateA, backgroundColor: 'pink' },
    { title: 'Norbert DUPUIT', date: dateA, backgroundColor: 'cyan' },
    { title: 'Yasmine AREZA', date: dateB, backgroundColor: 'cyan' },
    { title: 'Malcolm NOLASTNAME', date: dateB, backgroundColor: 'cyan' },
    { title: 'Francis NOLASTNAME', date: dateB, backgroundColor: 'cyan' },
    { title: 'Dewey NOLASTNAME', date: dateC, backgroundColor: 'pink' },
    { title: 'Jesse PINKMAN', date: dateC, backgroundColor: 'pink' },
  ];
  // End of Fake Data

  const [listEventsOptions, setListEventsOptions] =
    useState<ListScheduledEventsProps>({
      filter: undefined,
      limit: 1000,
    });

  const { data: events, isLoading: isEventsListLoading } =
    useListScheduledEvents(listEventsOptions);

  const [listGroupsOptions, setListGroupsOptions] = useState<ListGroupsProps>({
    filter: undefined,
    limit: 1000,
  });

  const {
    data: groupsList,
    isLoading: isGroupsListLoading,
    refetch: refetchListGroups,
  } = useListGroups(listGroupsOptions);

  const groupOptions: Group[] | undefined = groupsList
    ? groupsList.data.map((group) => ({
        value: group.id,
        label: group.name,
      }))
    : [];

  const filterGroups = (inputValue: string, path: DefaultOptionType[]) =>
    path.some(
      (option) =>
        (option.label as string)
          .toLowerCase()
          .indexOf(inputValue.toLowerCase()) > -1
    );

  const handleGroupSearch = (value: string) => {
    setListGroupsOptions((old) => ({
      filter: {
        name: value,
      },
      limit: old.limit,
    }));
  };

  useEffect(() => {
    refetchListGroups();
  }, [listGroupsOptions]);

  const [selectedGroup, setSelectedGroup] = useState<GroupData | undefined>(
    undefined
  );

  const onGroupChange = (value: (string | number)[]) => {
    let group = groupsList?.data.find((g) => g.id === value[0]) || undefined;
    setSelectedGroup(!!value ? group : undefined);

    setListEventsOptions((old) => ({
      filter: {
        group: !!group
          ? {
              id: group?.id,
            }
          : undefined,
      },
      limit: old.limit,
    }));
  };

  useEffect(() => {
    console.log({ selectedGroup });
  }, [selectedGroup]);

  return (
    <div className={styles.calendarTab}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          margin: 'var(--spacing-16) 0',
        }}
      >
        <Cascader
          loading={isGroupsListLoading}
          options={groupOptions}
          placeholder='Sélectionner un groupe'
          showSearch={{ filter: filterGroups }}
          onSearch={handleGroupSearch}
          maxTagCount='responsive'
          style={{ width: '213.17px' }}
          onChange={onGroupChange}
          changeOnSelect
        />
        <Popover
          placement='leftTop'
          content={
            !!selectedGroup && (
              <ScheduleEventForm
                initialGroup={selectedGroup}
                initialEventType={EventType.Class}
              />
            )
          }
          trigger='click'
        >
          <Button type='primary' disabled={!selectedGroup}>
            Planifier un cours
          </Button>
        </Popover>
      </div>
      <Calendar
        events={events?.data.map((e) => ({
          title: e.name,
          start: formatDateToISO8601(new Date(e.startDate)),
          end: formatDateToISO8601(new Date(e.endDate)),
          startTime: formatDateToISO8601(new Date(e.startDate)),
          endTime: formatDateToISO8601(new Date(e.endDate)),
          backgroundColor: getEventColor(e.eventType),
        }))}
      />
    </div>
  );
}
