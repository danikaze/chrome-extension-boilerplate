// tslint:disable:no-console
export const msgLog = msg.bind(undefined, 'log');
export const msgError = msg.bind(undefined, 'error');
export const msgWarn = msg.bind(undefined, 'warn');
export const msgTable = table.bind(undefined);

type MsgType = 'log' | 'error' | 'warn';
const COLOR_MAP: { [type: string]: string } = {
  log: '#000ca2',
  error: '#ca0000',
  warn: '#ffb818',
  table: '#999',
};
const PREFIX_STYLE = (type: MsgType | 'table') =>
  `font-weight: bold; background: ${COLOR_MAP[type]}; color: #fff; padding: 0 5px; border-top-left-radius: 7px; border-bottom-left-radius: 7px`;
const DATE_STYLE = `font-weight: bold; background: #666; color: #fff; padding: 0 5px; border-top-right-radius: 7px; border-bottom-right-radius: 7px`;

function msg(type: MsgType, ...data: unknown[]) {
  console[type](
    `%c${LOG_PREFIX}%c${getDate()}`,
    PREFIX_STYLE(type),
    DATE_STYLE,
    ...data
  );
}

function table<T extends {}>(data: T): void {
  console.log(
    `%c${LOG_PREFIX}%c${getDate()}`,
    PREFIX_STYLE('table'),
    DATE_STYLE
  );
  console.table(data);
}

function getDate(): string {
  // tslint:disable:no-magic-numbers
  const d = new Date();

  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const hh = String(d.getHours()).padStart(2, '0');
  const min = String(d.getMinutes()).padStart(2, '0');
  const ss = String(d.getSeconds()).padStart(2, '0');
  const zzz = String(d.getMilliseconds()).padStart(3, '0');

  return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}.${zzz}`;
}
