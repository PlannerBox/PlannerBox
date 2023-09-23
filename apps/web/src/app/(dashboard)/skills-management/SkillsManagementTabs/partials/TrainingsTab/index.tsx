'use client';

import { EventContentArg } from '@fullcalendar/core';
import frLocale from '@fullcalendar/core/locales/fr';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import { Badge, Button } from 'antd';
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

  function renderEventContent(eventInfo: EventContentArg) {
    return (
      <>
        <Badge
          color={eventInfo.backgroundColor}
          text={eventInfo.event.title}
          style={{ padding: '0 8px', overflow: 'hidden' }}
        />
      </>
    );
  }

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
            <Button type='primary'>
              Planifier une remise à niveau/formation
            </Button>
          </div>
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView='dayGridMonth'
            weekends={false}
            events={trainings}
            eventContent={renderEventContent}
            locale={frLocale}
            selectable={true}
          />
        </>
      )}
    </div>
  );
}
