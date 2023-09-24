import { EventContentArg, EventSourceInput } from '@fullcalendar/core';
import frLocale from '@fullcalendar/core/locales/fr';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import { Badge, Button, Segmented, Tooltip } from 'antd';
import { SegmentedValue } from 'antd/es/segmented';
import { useRef, useState } from 'react';
import styles from './styles.module.scss';

export type CalendarProps = {
  events?: EventSourceInput;
};

function renderEventContent(eventInfo: EventContentArg) {
  return (
    <Tooltip title={eventInfo.event.title} trigger='hover'>
      <Badge
        color={eventInfo.backgroundColor}
        text={eventInfo.event.title}
        style={{ padding: '0 8px', overflow: 'hidden' }}
      />
    </Tooltip>
  );
}

const Calendar = ({ events }: CalendarProps) => {
  const calendarRef = useRef<FullCalendar | null>(null);
  const calendarAPI = calendarRef?.current?.getApi();
  const [viewMode, setViewMode] = useState<string | number>('dayGridMonth');

  const handleTodayClick = () => {
    calendarAPI?.today();
  };

  const handlePreviousClick = () => {
    calendarAPI?.prev();
  };

  const handleNextClick = () => {
    calendarAPI?.next();
  };

  const handleViewModeChange = (newViewMode: SegmentedValue) => {
    setViewMode(newViewMode);
    calendarAPI?.changeView(newViewMode as string);
  };

  return (
    <div>
      <div className={styles.headerToolbar}>
        <div className={styles.headerToolbarActionsGroup}>
          <Button onClick={handleTodayClick}>Aujourd'hui</Button>
          <Button onClick={handlePreviousClick}>{'<'}</Button>
          <Button onClick={handleNextClick}>{'>'}</Button>
        </div>
        <div className={styles.headerToolbarActionsGroup}>
          <Segmented
            options={[
              { label: 'Jour', value: 'dayGridDay' },
              { label: 'Semaine', value: 'dayGridWeek' },
              { label: 'Mois', value: 'dayGridMonth' },
            ]}
            value={viewMode}
            onChange={(v) => handleViewModeChange(v)}
          />
        </div>
      </div>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin]}
        locale={frLocale}
        initialView='dayGridMonth'
        events={events}
        eventContent={renderEventContent}
        headerToolbar={false}
        weekends={false}
        selectable={true}
      />
    </div>
  );
};

export default Calendar;
