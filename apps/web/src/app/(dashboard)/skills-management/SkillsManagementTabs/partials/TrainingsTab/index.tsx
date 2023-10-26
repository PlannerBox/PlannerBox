'use client';

import { Button, Tooltip } from 'antd';
import {
  EventType,
  ListScheduledEventsProps,
  formatDateToISO8601,
} from 'api-client';
import { useState } from 'react';
import { useListScheduledEvents } from '../../../../../../hooks/useListScheduledEvents';
import Calendar, { getEventColor } from '../../../../../components/Calendar';
import styles from './styles.module.scss';

type TrainingsTabProps = {
  step?: 'list';
};

export default function TrainingsTab({ step = 'list' }: TrainingsTabProps) {
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
      filter: {
        types: [EventType.Formation, EventType.RefresherCourse],
      },
      limit: 1000,
    });

  const { data: events, isLoading: isEventsListLoading } =
    useListScheduledEvents(listEventsOptions);

  return (
    <div className={styles.trainingsTab}>
      {step === 'list' && (
        <>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              margin: 'var(--spacing-16) var(--spacing-8)',
            }}
          >
            <Tooltip title='Bientôt disponible' trigger='hover'>
              <Button type='primary' disabled>
                Planifier une remise à niveau/formation
              </Button>
            </Tooltip>
          </div>
          <Calendar
            events={
              !isEventsListLoading
                ? events?.data.map((e) => ({
                    title: e.name,
                    start: formatDateToISO8601(new Date(e.startDate)),
                    end: formatDateToISO8601(new Date(e.endDate)),
                    startTime: formatDateToISO8601(new Date(e.startDate)),
                    endTime: formatDateToISO8601(new Date(e.endDate)),
                    backgroundColor: getEventColor(e.eventType),
                    extendedProps: {
                      ...e,
                    },
                  }))
                : []
            }
          />
        </>
      )}
    </div>
  );
}
