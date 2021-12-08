/* eslint-disable no-undef */
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
import fastify from 'fastify'
import controller from '$/api/tasks/controller'
test('dependency injection into controller', () =>
  __awaiter(void 0, void 0, void 0, function* () {
    let printedMessage = ''
    const injectedController = controller.inject((deps) => ({
      getTasks: deps.getTasks.inject({
        prisma: {
          task: {
            findMany: () =>
              Promise.resolve([
                { id: 0, label: 'task1', done: false },
                { id: 1, label: 'task2', done: false },
                { id: 2, label: 'task3', done: true },
                { id: 3, label: 'task4', done: true },
                { id: 4, label: 'task5', done: false }
              ])
          }
        }
      }),
      print: (text) => {
        printedMessage = text
      }
    }))(fastify())
    const limit = 3
    const message = 'test message'
    const res = yield injectedController.get({
      query: { limit, message }
    })
    expect(res.body).toHaveLength(limit)
    expect(printedMessage).toBe(message)
  }))
