import { IBlueprint } from "@stone-js/core"

// Data
const data: Record<string, Record<string, any[]>> = {}

/**
 * Database options
 */
export interface DummydbOptions {
  blueprint: IBlueprint
}

/**
 * Database Connection options
 */
export interface DummydbConnectOptions {
  name: string
  host: string
  username: string
  password: string
}

/**
 * Database Factory
 */
export class Dummydb {
  private tableName: string
  private readonly options: DummydbConnectOptions

  /**
   * Create a new Dummydb
   * 
   * @param blueprint - The blueprint
   */
  constructor({ blueprint }: DummydbOptions) {
    this.tableName = 'dummy'
    this.options = blueprint.get<DummydbConnectOptions>('dummydb', { name: 'dummyDb' } as DummydbConnectOptions)
    data[this.options.name] ??= { [this.tableName]: [] }
  }

  /**
   * Get the current data
   * 
   * @returns The current data
   */
  private get current(): any[] {
    return data[this.options.name][this.tableName] ?? []
  }

  /**
   * Set the current data
   * 
   * @param data - The data to set
   */
  private set current(value: any[]) {
    data[this.options.name][this.tableName] = value
  }

  /**
   * Set the table
   * 
   * @param tableName - The table name
   * @returns The Dummydb instance
   */
  table (tableName: string): this {
    this.tableName = tableName
    return this
  }
  
  /**
   * Insert a row
   * 
   * @param row - The row to insert
   * @returns The id of the inserted row
   */
  insert<T = any>(row: T): Promise<number | undefined> {
    this.current = [...this.current, row]
    return Promise.resolve(this.current.length - 1)
  }

  /**
   * Update a row
   * 
   * @param row - The row to update
   * @returns The updated row
   */
  update<T = any>(row: T): Promise<T> {
    this.current = this.current?.map((r) => this.current?.some((cr) => cr.id === r.id) ? row : r)
    return Promise.resolve(row)
  }

  /**
   * Delete rows
   */
  delete(): Promise<void> {
    this.current = this.current?.filter((row) => this.current?.every((r) => r.id !== row.id))
    return Promise.resolve()
  }

  /**
   * Limit the rows
   * 
   * @param limit - The limit
   * @returns The Dummydb instance
   */
  limit(limit: number): this {
    this.current = this.current?.slice(0, limit)
    return this
  }

  /**
   * Filter rows
   * 
   * @param id - The id to filter
   * @returns The Dummydb instance
   */
  where(conditions: Record<string, any>): this {
    this.current = this.current?.filter(
      (row) => Object
        .entries(conditions)
        .every(([key, value]) => row[key] == value)
    )
    return this
  }

  /**
   * Get the first row
   * 
   * @returns The first
   */
  first<T = any>(): Promise<T | undefined> {
    return Promise.resolve(this.current?.[0])
  }

  /**
   * Get the rows
   * 
   * @returns The rows
   */
  get<T = any>(): Promise<T[]> {
    return Promise.resolve(this.current ?? [])
  }
}
