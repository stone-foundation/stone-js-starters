// Data
const data: Record<string, any[]> = {}

/**
 * Database interface
 */
export interface IDB {
  current: any[]
  insert<T = any>(row: T): Promise<number | undefined>
  update<T = any>(row: T): Promise<T>
  delete(): Promise<void>
  limit(limit: number): IDB
  where(conditions: Record<string, any>): IDB
  first<T = any>(): Promise<T | undefined>
  get<T = any>(): Promise<T[]>
}

/**
 * Database factory
 */
export type DbFactory = (tableName: string) => IDB

/**
 * Database
 */
export const db: DbFactory = (tableName: string): IDB => ({
  get current(): any[] {
    return data[tableName] ?? []
  },
  set current(value: any[]) {
    data[tableName] = value
  },
  insert<T = any>(row: T): Promise<number | undefined> {
    this.current = [...this.current, row]
    return Promise.resolve(this.current.length - 1)
  },
  update<T = any>(row: T): Promise<T> {
    this.current = this.current?.map((r) => this.current?.some((cr) => cr.id === r.id) ? row : r)
    return Promise.resolve(row)
  }, 
  delete(): Promise<void> {
    this.current = this.current?.filter((row) => this.current?.every((r) => r.id !== row.id))
    return Promise.resolve()
  },
  limit(limit: number): IDB {
    this.current = this.current?.slice(0, limit)
    return this
  },
  where(conditions: Record<string, any>): IDB {
    this.current = this.current?.filter(
      (row) => Object
        .entries(conditions)
        .every(([key, value]) => row[key] == value)
    )
    return this
  },
  first<T = any>(): Promise<T | undefined> {
    return Promise.resolve(this.current?.[0])
  },
  get<T = any>(): Promise<T[]> {
    return Promise.resolve(this.current ?? [])
  }
})