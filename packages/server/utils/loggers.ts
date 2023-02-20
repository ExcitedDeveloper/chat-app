import { createLogger, transports, format } from 'winston'

const loggerFormat = format.combine(
  format.timestamp(),
  format.printf(({ timestamp, level, message, service }) => {
    return `[${timestamp}] ${service} ${level}: ${message}`
  })
)

const defaultMeta = {
  service: 'WinstonExample',
}

const dirname = 'logs'

export const errorLogger = createLogger({
  transports: [
    new transports.File({
      dirname,
      filename: 'errors.log',
    }),
  ],
  format: loggerFormat,
  defaultMeta,
})

export const successLogger = createLogger({
  transports: [
    new transports.File({
      dirname,
      filename: 'success.log',
    }),
  ],
  format: loggerFormat,
  defaultMeta,
})

export const infoLogger = createLogger({
  transports: [
    new transports.File({
      dirname,
      filename: 'info.log',
    }),
  ],
  format: loggerFormat,
  defaultMeta,
})
