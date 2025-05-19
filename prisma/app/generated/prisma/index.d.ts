
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model CommunityMember
 * 
 */
export type CommunityMember = $Result.DefaultSelection<Prisma.$CommunityMemberPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Gender: {
  PRIA: 'PRIA',
  WANITA: 'WANITA'
};

export type Gender = (typeof Gender)[keyof typeof Gender]


export const GenderIdentity: {
  NONE: 'NONE',
  WARIA: 'WARIA'
};

export type GenderIdentity = (typeof GenderIdentity)[keyof typeof GenderIdentity]


export const ResidencyStatus: {
  PENDATANG: 'PENDATANG',
  PENDUDUK_TETAP: 'PENDUDUK_TETAP'
};

export type ResidencyStatus = (typeof ResidencyStatus)[keyof typeof ResidencyStatus]


export const LivingSituation: {
  BERSAMA_ORANG_TUA: 'BERSAMA_ORANG_TUA',
  RUMAH_PRIBADI: 'RUMAH_PRIBADI',
  SEWA_KONTRAK: 'SEWA_KONTRAK'
};

export type LivingSituation = (typeof LivingSituation)[keyof typeof LivingSituation]


export const EKTPStatus: {
  MEMILIKI: 'MEMILIKI',
  TIDAK_MEMILIKI: 'TIDAK_MEMILIKI',
  DALAM_PROSES: 'DALAM_PROSES'
};

export type EKTPStatus = (typeof EKTPStatus)[keyof typeof EKTPStatus]


export const EducationLevel: {
  SD: 'SD',
  SMP: 'SMP',
  SMA_SMK: 'SMA_SMK',
  PERGURUAN_TINGGI: 'PERGURUAN_TINGGI',
  TIDAK_SEKOLAH: 'TIDAK_SEKOLAH'
};

export type EducationLevel = (typeof EducationLevel)[keyof typeof EducationLevel]


export const HealthServiceAccess: {
  PUSKESMAS: 'PUSKESMAS',
  RUMAH_SAKIT: 'RUMAH_SAKIT',
  KLINIK: 'KLINIK',
  TIDAK_PERNAH: 'TIDAK_PERNAH'
};

export type HealthServiceAccess = (typeof HealthServiceAccess)[keyof typeof HealthServiceAccess]


export const DiscriminationExperience: {
  TIDAK_PERNAH: 'TIDAK_PERNAH',
  PERNAH_MENGALAMI: 'PERNAH_MENGALAMI'
};

export type DiscriminationExperience = (typeof DiscriminationExperience)[keyof typeof DiscriminationExperience]


export const MaritalStatus: {
  BELUM_KAWIN: 'BELUM_KAWIN',
  KAWIN: 'KAWIN',
  CERAI: 'CERAI'
};

export type MaritalStatus = (typeof MaritalStatus)[keyof typeof MaritalStatus]


export const EmploymentStatus: {
  BEKERJA: 'BEKERJA',
  TIDAK_BEKERJA: 'TIDAK_BEKERJA',
  PELAJAR: 'PELAJAR',
  MAHASISWA: 'MAHASISWA'
};

export type EmploymentStatus = (typeof EmploymentStatus)[keyof typeof EmploymentStatus]

}

export type Gender = $Enums.Gender

export const Gender: typeof $Enums.Gender

export type GenderIdentity = $Enums.GenderIdentity

export const GenderIdentity: typeof $Enums.GenderIdentity

export type ResidencyStatus = $Enums.ResidencyStatus

export const ResidencyStatus: typeof $Enums.ResidencyStatus

export type LivingSituation = $Enums.LivingSituation

export const LivingSituation: typeof $Enums.LivingSituation

export type EKTPStatus = $Enums.EKTPStatus

export const EKTPStatus: typeof $Enums.EKTPStatus

export type EducationLevel = $Enums.EducationLevel

export const EducationLevel: typeof $Enums.EducationLevel

export type HealthServiceAccess = $Enums.HealthServiceAccess

export const HealthServiceAccess: typeof $Enums.HealthServiceAccess

export type DiscriminationExperience = $Enums.DiscriminationExperience

export const DiscriminationExperience: typeof $Enums.DiscriminationExperience

export type MaritalStatus = $Enums.MaritalStatus

export const MaritalStatus: typeof $Enums.MaritalStatus

export type EmploymentStatus = $Enums.EmploymentStatus

export const EmploymentStatus: typeof $Enums.EmploymentStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more CommunityMembers
 * const communityMembers = await prisma.communityMember.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more CommunityMembers
   * const communityMembers = await prisma.communityMember.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.communityMember`: Exposes CRUD operations for the **CommunityMember** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CommunityMembers
    * const communityMembers = await prisma.communityMember.findMany()
    * ```
    */
  get communityMember(): Prisma.CommunityMemberDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.8.2
   * Query Engine version: 2060c79ba17c6bb9f5823312b6f6b7f4a845738e
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    CommunityMember: 'CommunityMember'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "communityMember"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      CommunityMember: {
        payload: Prisma.$CommunityMemberPayload<ExtArgs>
        fields: Prisma.CommunityMemberFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CommunityMemberFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommunityMemberPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CommunityMemberFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommunityMemberPayload>
          }
          findFirst: {
            args: Prisma.CommunityMemberFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommunityMemberPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CommunityMemberFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommunityMemberPayload>
          }
          findMany: {
            args: Prisma.CommunityMemberFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommunityMemberPayload>[]
          }
          create: {
            args: Prisma.CommunityMemberCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommunityMemberPayload>
          }
          createMany: {
            args: Prisma.CommunityMemberCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CommunityMemberCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommunityMemberPayload>[]
          }
          delete: {
            args: Prisma.CommunityMemberDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommunityMemberPayload>
          }
          update: {
            args: Prisma.CommunityMemberUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommunityMemberPayload>
          }
          deleteMany: {
            args: Prisma.CommunityMemberDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CommunityMemberUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CommunityMemberUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommunityMemberPayload>[]
          }
          upsert: {
            args: Prisma.CommunityMemberUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommunityMemberPayload>
          }
          aggregate: {
            args: Prisma.CommunityMemberAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCommunityMember>
          }
          groupBy: {
            args: Prisma.CommunityMemberGroupByArgs<ExtArgs>
            result: $Utils.Optional<CommunityMemberGroupByOutputType>[]
          }
          count: {
            args: Prisma.CommunityMemberCountArgs<ExtArgs>
            result: $Utils.Optional<CommunityMemberCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    communityMember?: CommunityMemberOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model CommunityMember
   */

  export type AggregateCommunityMember = {
    _count: CommunityMemberCountAggregateOutputType | null
    _avg: CommunityMemberAvgAggregateOutputType | null
    _sum: CommunityMemberSumAggregateOutputType | null
    _min: CommunityMemberMinAggregateOutputType | null
    _max: CommunityMemberMaxAggregateOutputType | null
  }

  export type CommunityMemberAvgAggregateOutputType = {
    age: number | null
  }

  export type CommunityMemberSumAggregateOutputType = {
    age: number | null
  }

  export type CommunityMemberMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    firstName: string | null
    middleName: string | null
    lastName: string | null
    communityNickname: string | null
    placeOfBirth: string | null
    dateOfBirth: Date | null
    age: number | null
    gender: $Enums.Gender | null
    genderIdentity: $Enums.GenderIdentity | null
    nik: string | null
    idScanUrl: string | null
    familyCardNumber: string | null
    ektpStatus: $Enums.EKTPStatus | null
    address: string | null
    domicileKelurahan: string | null
    domicileKecamatan: string | null
    domicileRegencyCity: string | null
    city: string | null
    residencyStatus: $Enums.ResidencyStatus | null
    livingSituation: $Enums.LivingSituation | null
    phoneNumber: string | null
    serviceContactPerson: string | null
    maritalStatus: $Enums.MaritalStatus | null
    lastEducation: $Enums.EducationLevel | null
    isStillStudying: boolean | null
    employmentStatus: $Enums.EmploymentStatus | null
    jobDescription: string | null
    monthlyIncome: string | null
    hasOwnBusiness: boolean | null
    hasReceivedSkillTraining: boolean | null
    skillTrainingType: string | null
    desiredSkillTraining: string | null
    businessDetails: string | null
    hasBpjs: boolean | null
    bpjsId: string | null
    bpjsScanUrl: string | null
    healthServiceAccess: $Enums.HealthServiceAccess | null
    chronicIllness: string | null
    discriminationExperience: $Enums.DiscriminationExperience | null
    discriminationType: string | null
    discriminationPerpetrator: string | null
    discriminationLocation: string | null
    wasDiscriminationReported: boolean | null
    receivesSocialAssistance: boolean | null
    isRegisteredInDTKS: boolean | null
    communityGroup: string | null
  }

  export type CommunityMemberMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    firstName: string | null
    middleName: string | null
    lastName: string | null
    communityNickname: string | null
    placeOfBirth: string | null
    dateOfBirth: Date | null
    age: number | null
    gender: $Enums.Gender | null
    genderIdentity: $Enums.GenderIdentity | null
    nik: string | null
    idScanUrl: string | null
    familyCardNumber: string | null
    ektpStatus: $Enums.EKTPStatus | null
    address: string | null
    domicileKelurahan: string | null
    domicileKecamatan: string | null
    domicileRegencyCity: string | null
    city: string | null
    residencyStatus: $Enums.ResidencyStatus | null
    livingSituation: $Enums.LivingSituation | null
    phoneNumber: string | null
    serviceContactPerson: string | null
    maritalStatus: $Enums.MaritalStatus | null
    lastEducation: $Enums.EducationLevel | null
    isStillStudying: boolean | null
    employmentStatus: $Enums.EmploymentStatus | null
    jobDescription: string | null
    monthlyIncome: string | null
    hasOwnBusiness: boolean | null
    hasReceivedSkillTraining: boolean | null
    skillTrainingType: string | null
    desiredSkillTraining: string | null
    businessDetails: string | null
    hasBpjs: boolean | null
    bpjsId: string | null
    bpjsScanUrl: string | null
    healthServiceAccess: $Enums.HealthServiceAccess | null
    chronicIllness: string | null
    discriminationExperience: $Enums.DiscriminationExperience | null
    discriminationType: string | null
    discriminationPerpetrator: string | null
    discriminationLocation: string | null
    wasDiscriminationReported: boolean | null
    receivesSocialAssistance: boolean | null
    isRegisteredInDTKS: boolean | null
    communityGroup: string | null
  }

  export type CommunityMemberCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    firstName: number
    middleName: number
    lastName: number
    communityNickname: number
    placeOfBirth: number
    dateOfBirth: number
    age: number
    gender: number
    genderIdentity: number
    nik: number
    idScanUrl: number
    familyCardNumber: number
    ektpStatus: number
    address: number
    domicileKelurahan: number
    domicileKecamatan: number
    domicileRegencyCity: number
    city: number
    residencyStatus: number
    livingSituation: number
    phoneNumber: number
    serviceContactPerson: number
    maritalStatus: number
    lastEducation: number
    isStillStudying: number
    employmentStatus: number
    jobDescription: number
    monthlyIncome: number
    hasOwnBusiness: number
    hasReceivedSkillTraining: number
    skillTrainingType: number
    desiredSkillTraining: number
    businessDetails: number
    hasBpjs: number
    bpjsId: number
    bpjsScanUrl: number
    healthServiceAccess: number
    chronicIllness: number
    discriminationExperience: number
    discriminationType: number
    discriminationPerpetrator: number
    discriminationLocation: number
    wasDiscriminationReported: number
    receivesSocialAssistance: number
    isRegisteredInDTKS: number
    communityGroup: number
    _all: number
  }


  export type CommunityMemberAvgAggregateInputType = {
    age?: true
  }

  export type CommunityMemberSumAggregateInputType = {
    age?: true
  }

  export type CommunityMemberMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    firstName?: true
    middleName?: true
    lastName?: true
    communityNickname?: true
    placeOfBirth?: true
    dateOfBirth?: true
    age?: true
    gender?: true
    genderIdentity?: true
    nik?: true
    idScanUrl?: true
    familyCardNumber?: true
    ektpStatus?: true
    address?: true
    domicileKelurahan?: true
    domicileKecamatan?: true
    domicileRegencyCity?: true
    city?: true
    residencyStatus?: true
    livingSituation?: true
    phoneNumber?: true
    serviceContactPerson?: true
    maritalStatus?: true
    lastEducation?: true
    isStillStudying?: true
    employmentStatus?: true
    jobDescription?: true
    monthlyIncome?: true
    hasOwnBusiness?: true
    hasReceivedSkillTraining?: true
    skillTrainingType?: true
    desiredSkillTraining?: true
    businessDetails?: true
    hasBpjs?: true
    bpjsId?: true
    bpjsScanUrl?: true
    healthServiceAccess?: true
    chronicIllness?: true
    discriminationExperience?: true
    discriminationType?: true
    discriminationPerpetrator?: true
    discriminationLocation?: true
    wasDiscriminationReported?: true
    receivesSocialAssistance?: true
    isRegisteredInDTKS?: true
    communityGroup?: true
  }

  export type CommunityMemberMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    firstName?: true
    middleName?: true
    lastName?: true
    communityNickname?: true
    placeOfBirth?: true
    dateOfBirth?: true
    age?: true
    gender?: true
    genderIdentity?: true
    nik?: true
    idScanUrl?: true
    familyCardNumber?: true
    ektpStatus?: true
    address?: true
    domicileKelurahan?: true
    domicileKecamatan?: true
    domicileRegencyCity?: true
    city?: true
    residencyStatus?: true
    livingSituation?: true
    phoneNumber?: true
    serviceContactPerson?: true
    maritalStatus?: true
    lastEducation?: true
    isStillStudying?: true
    employmentStatus?: true
    jobDescription?: true
    monthlyIncome?: true
    hasOwnBusiness?: true
    hasReceivedSkillTraining?: true
    skillTrainingType?: true
    desiredSkillTraining?: true
    businessDetails?: true
    hasBpjs?: true
    bpjsId?: true
    bpjsScanUrl?: true
    healthServiceAccess?: true
    chronicIllness?: true
    discriminationExperience?: true
    discriminationType?: true
    discriminationPerpetrator?: true
    discriminationLocation?: true
    wasDiscriminationReported?: true
    receivesSocialAssistance?: true
    isRegisteredInDTKS?: true
    communityGroup?: true
  }

  export type CommunityMemberCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    firstName?: true
    middleName?: true
    lastName?: true
    communityNickname?: true
    placeOfBirth?: true
    dateOfBirth?: true
    age?: true
    gender?: true
    genderIdentity?: true
    nik?: true
    idScanUrl?: true
    familyCardNumber?: true
    ektpStatus?: true
    address?: true
    domicileKelurahan?: true
    domicileKecamatan?: true
    domicileRegencyCity?: true
    city?: true
    residencyStatus?: true
    livingSituation?: true
    phoneNumber?: true
    serviceContactPerson?: true
    maritalStatus?: true
    lastEducation?: true
    isStillStudying?: true
    employmentStatus?: true
    jobDescription?: true
    monthlyIncome?: true
    hasOwnBusiness?: true
    hasReceivedSkillTraining?: true
    skillTrainingType?: true
    desiredSkillTraining?: true
    businessDetails?: true
    hasBpjs?: true
    bpjsId?: true
    bpjsScanUrl?: true
    healthServiceAccess?: true
    chronicIllness?: true
    discriminationExperience?: true
    discriminationType?: true
    discriminationPerpetrator?: true
    discriminationLocation?: true
    wasDiscriminationReported?: true
    receivesSocialAssistance?: true
    isRegisteredInDTKS?: true
    communityGroup?: true
    _all?: true
  }

  export type CommunityMemberAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CommunityMember to aggregate.
     */
    where?: CommunityMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CommunityMembers to fetch.
     */
    orderBy?: CommunityMemberOrderByWithRelationInput | CommunityMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CommunityMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CommunityMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CommunityMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CommunityMembers
    **/
    _count?: true | CommunityMemberCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CommunityMemberAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CommunityMemberSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CommunityMemberMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CommunityMemberMaxAggregateInputType
  }

  export type GetCommunityMemberAggregateType<T extends CommunityMemberAggregateArgs> = {
        [P in keyof T & keyof AggregateCommunityMember]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCommunityMember[P]>
      : GetScalarType<T[P], AggregateCommunityMember[P]>
  }




  export type CommunityMemberGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommunityMemberWhereInput
    orderBy?: CommunityMemberOrderByWithAggregationInput | CommunityMemberOrderByWithAggregationInput[]
    by: CommunityMemberScalarFieldEnum[] | CommunityMemberScalarFieldEnum
    having?: CommunityMemberScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CommunityMemberCountAggregateInputType | true
    _avg?: CommunityMemberAvgAggregateInputType
    _sum?: CommunityMemberSumAggregateInputType
    _min?: CommunityMemberMinAggregateInputType
    _max?: CommunityMemberMaxAggregateInputType
  }

  export type CommunityMemberGroupByOutputType = {
    id: string
    createdAt: Date
    updatedAt: Date
    firstName: string
    middleName: string | null
    lastName: string | null
    communityNickname: string | null
    placeOfBirth: string | null
    dateOfBirth: Date | null
    age: number | null
    gender: $Enums.Gender | null
    genderIdentity: $Enums.GenderIdentity | null
    nik: string | null
    idScanUrl: string | null
    familyCardNumber: string | null
    ektpStatus: $Enums.EKTPStatus | null
    address: string | null
    domicileKelurahan: string | null
    domicileKecamatan: string | null
    domicileRegencyCity: string | null
    city: string | null
    residencyStatus: $Enums.ResidencyStatus | null
    livingSituation: $Enums.LivingSituation | null
    phoneNumber: string | null
    serviceContactPerson: string | null
    maritalStatus: $Enums.MaritalStatus | null
    lastEducation: $Enums.EducationLevel | null
    isStillStudying: boolean | null
    employmentStatus: $Enums.EmploymentStatus | null
    jobDescription: string | null
    monthlyIncome: string | null
    hasOwnBusiness: boolean | null
    hasReceivedSkillTraining: boolean | null
    skillTrainingType: string | null
    desiredSkillTraining: string | null
    businessDetails: string | null
    hasBpjs: boolean
    bpjsId: string | null
    bpjsScanUrl: string | null
    healthServiceAccess: $Enums.HealthServiceAccess | null
    chronicIllness: string | null
    discriminationExperience: $Enums.DiscriminationExperience | null
    discriminationType: string | null
    discriminationPerpetrator: string | null
    discriminationLocation: string | null
    wasDiscriminationReported: boolean | null
    receivesSocialAssistance: boolean | null
    isRegisteredInDTKS: boolean | null
    communityGroup: string | null
    _count: CommunityMemberCountAggregateOutputType | null
    _avg: CommunityMemberAvgAggregateOutputType | null
    _sum: CommunityMemberSumAggregateOutputType | null
    _min: CommunityMemberMinAggregateOutputType | null
    _max: CommunityMemberMaxAggregateOutputType | null
  }

  type GetCommunityMemberGroupByPayload<T extends CommunityMemberGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CommunityMemberGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CommunityMemberGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CommunityMemberGroupByOutputType[P]>
            : GetScalarType<T[P], CommunityMemberGroupByOutputType[P]>
        }
      >
    >


  export type CommunityMemberSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    firstName?: boolean
    middleName?: boolean
    lastName?: boolean
    communityNickname?: boolean
    placeOfBirth?: boolean
    dateOfBirth?: boolean
    age?: boolean
    gender?: boolean
    genderIdentity?: boolean
    nik?: boolean
    idScanUrl?: boolean
    familyCardNumber?: boolean
    ektpStatus?: boolean
    address?: boolean
    domicileKelurahan?: boolean
    domicileKecamatan?: boolean
    domicileRegencyCity?: boolean
    city?: boolean
    residencyStatus?: boolean
    livingSituation?: boolean
    phoneNumber?: boolean
    serviceContactPerson?: boolean
    maritalStatus?: boolean
    lastEducation?: boolean
    isStillStudying?: boolean
    employmentStatus?: boolean
    jobDescription?: boolean
    monthlyIncome?: boolean
    hasOwnBusiness?: boolean
    hasReceivedSkillTraining?: boolean
    skillTrainingType?: boolean
    desiredSkillTraining?: boolean
    businessDetails?: boolean
    hasBpjs?: boolean
    bpjsId?: boolean
    bpjsScanUrl?: boolean
    healthServiceAccess?: boolean
    chronicIllness?: boolean
    discriminationExperience?: boolean
    discriminationType?: boolean
    discriminationPerpetrator?: boolean
    discriminationLocation?: boolean
    wasDiscriminationReported?: boolean
    receivesSocialAssistance?: boolean
    isRegisteredInDTKS?: boolean
    communityGroup?: boolean
  }, ExtArgs["result"]["communityMember"]>

  export type CommunityMemberSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    firstName?: boolean
    middleName?: boolean
    lastName?: boolean
    communityNickname?: boolean
    placeOfBirth?: boolean
    dateOfBirth?: boolean
    age?: boolean
    gender?: boolean
    genderIdentity?: boolean
    nik?: boolean
    idScanUrl?: boolean
    familyCardNumber?: boolean
    ektpStatus?: boolean
    address?: boolean
    domicileKelurahan?: boolean
    domicileKecamatan?: boolean
    domicileRegencyCity?: boolean
    city?: boolean
    residencyStatus?: boolean
    livingSituation?: boolean
    phoneNumber?: boolean
    serviceContactPerson?: boolean
    maritalStatus?: boolean
    lastEducation?: boolean
    isStillStudying?: boolean
    employmentStatus?: boolean
    jobDescription?: boolean
    monthlyIncome?: boolean
    hasOwnBusiness?: boolean
    hasReceivedSkillTraining?: boolean
    skillTrainingType?: boolean
    desiredSkillTraining?: boolean
    businessDetails?: boolean
    hasBpjs?: boolean
    bpjsId?: boolean
    bpjsScanUrl?: boolean
    healthServiceAccess?: boolean
    chronicIllness?: boolean
    discriminationExperience?: boolean
    discriminationType?: boolean
    discriminationPerpetrator?: boolean
    discriminationLocation?: boolean
    wasDiscriminationReported?: boolean
    receivesSocialAssistance?: boolean
    isRegisteredInDTKS?: boolean
    communityGroup?: boolean
  }, ExtArgs["result"]["communityMember"]>

  export type CommunityMemberSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    firstName?: boolean
    middleName?: boolean
    lastName?: boolean
    communityNickname?: boolean
    placeOfBirth?: boolean
    dateOfBirth?: boolean
    age?: boolean
    gender?: boolean
    genderIdentity?: boolean
    nik?: boolean
    idScanUrl?: boolean
    familyCardNumber?: boolean
    ektpStatus?: boolean
    address?: boolean
    domicileKelurahan?: boolean
    domicileKecamatan?: boolean
    domicileRegencyCity?: boolean
    city?: boolean
    residencyStatus?: boolean
    livingSituation?: boolean
    phoneNumber?: boolean
    serviceContactPerson?: boolean
    maritalStatus?: boolean
    lastEducation?: boolean
    isStillStudying?: boolean
    employmentStatus?: boolean
    jobDescription?: boolean
    monthlyIncome?: boolean
    hasOwnBusiness?: boolean
    hasReceivedSkillTraining?: boolean
    skillTrainingType?: boolean
    desiredSkillTraining?: boolean
    businessDetails?: boolean
    hasBpjs?: boolean
    bpjsId?: boolean
    bpjsScanUrl?: boolean
    healthServiceAccess?: boolean
    chronicIllness?: boolean
    discriminationExperience?: boolean
    discriminationType?: boolean
    discriminationPerpetrator?: boolean
    discriminationLocation?: boolean
    wasDiscriminationReported?: boolean
    receivesSocialAssistance?: boolean
    isRegisteredInDTKS?: boolean
    communityGroup?: boolean
  }, ExtArgs["result"]["communityMember"]>

  export type CommunityMemberSelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    firstName?: boolean
    middleName?: boolean
    lastName?: boolean
    communityNickname?: boolean
    placeOfBirth?: boolean
    dateOfBirth?: boolean
    age?: boolean
    gender?: boolean
    genderIdentity?: boolean
    nik?: boolean
    idScanUrl?: boolean
    familyCardNumber?: boolean
    ektpStatus?: boolean
    address?: boolean
    domicileKelurahan?: boolean
    domicileKecamatan?: boolean
    domicileRegencyCity?: boolean
    city?: boolean
    residencyStatus?: boolean
    livingSituation?: boolean
    phoneNumber?: boolean
    serviceContactPerson?: boolean
    maritalStatus?: boolean
    lastEducation?: boolean
    isStillStudying?: boolean
    employmentStatus?: boolean
    jobDescription?: boolean
    monthlyIncome?: boolean
    hasOwnBusiness?: boolean
    hasReceivedSkillTraining?: boolean
    skillTrainingType?: boolean
    desiredSkillTraining?: boolean
    businessDetails?: boolean
    hasBpjs?: boolean
    bpjsId?: boolean
    bpjsScanUrl?: boolean
    healthServiceAccess?: boolean
    chronicIllness?: boolean
    discriminationExperience?: boolean
    discriminationType?: boolean
    discriminationPerpetrator?: boolean
    discriminationLocation?: boolean
    wasDiscriminationReported?: boolean
    receivesSocialAssistance?: boolean
    isRegisteredInDTKS?: boolean
    communityGroup?: boolean
  }

  export type CommunityMemberOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "updatedAt" | "firstName" | "middleName" | "lastName" | "communityNickname" | "placeOfBirth" | "dateOfBirth" | "age" | "gender" | "genderIdentity" | "nik" | "idScanUrl" | "familyCardNumber" | "ektpStatus" | "address" | "domicileKelurahan" | "domicileKecamatan" | "domicileRegencyCity" | "city" | "residencyStatus" | "livingSituation" | "phoneNumber" | "serviceContactPerson" | "maritalStatus" | "lastEducation" | "isStillStudying" | "employmentStatus" | "jobDescription" | "monthlyIncome" | "hasOwnBusiness" | "hasReceivedSkillTraining" | "skillTrainingType" | "desiredSkillTraining" | "businessDetails" | "hasBpjs" | "bpjsId" | "bpjsScanUrl" | "healthServiceAccess" | "chronicIllness" | "discriminationExperience" | "discriminationType" | "discriminationPerpetrator" | "discriminationLocation" | "wasDiscriminationReported" | "receivesSocialAssistance" | "isRegisteredInDTKS" | "communityGroup", ExtArgs["result"]["communityMember"]>

  export type $CommunityMemberPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CommunityMember"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      updatedAt: Date
      firstName: string
      middleName: string | null
      lastName: string | null
      communityNickname: string | null
      placeOfBirth: string | null
      dateOfBirth: Date | null
      age: number | null
      gender: $Enums.Gender | null
      genderIdentity: $Enums.GenderIdentity | null
      nik: string | null
      idScanUrl: string | null
      familyCardNumber: string | null
      ektpStatus: $Enums.EKTPStatus | null
      address: string | null
      domicileKelurahan: string | null
      domicileKecamatan: string | null
      domicileRegencyCity: string | null
      city: string | null
      residencyStatus: $Enums.ResidencyStatus | null
      livingSituation: $Enums.LivingSituation | null
      phoneNumber: string | null
      serviceContactPerson: string | null
      maritalStatus: $Enums.MaritalStatus | null
      lastEducation: $Enums.EducationLevel | null
      isStillStudying: boolean | null
      employmentStatus: $Enums.EmploymentStatus | null
      jobDescription: string | null
      monthlyIncome: string | null
      hasOwnBusiness: boolean | null
      hasReceivedSkillTraining: boolean | null
      skillTrainingType: string | null
      desiredSkillTraining: string | null
      businessDetails: string | null
      hasBpjs: boolean
      bpjsId: string | null
      bpjsScanUrl: string | null
      healthServiceAccess: $Enums.HealthServiceAccess | null
      chronicIllness: string | null
      discriminationExperience: $Enums.DiscriminationExperience | null
      discriminationType: string | null
      discriminationPerpetrator: string | null
      discriminationLocation: string | null
      wasDiscriminationReported: boolean | null
      receivesSocialAssistance: boolean | null
      isRegisteredInDTKS: boolean | null
      communityGroup: string | null
    }, ExtArgs["result"]["communityMember"]>
    composites: {}
  }

  type CommunityMemberGetPayload<S extends boolean | null | undefined | CommunityMemberDefaultArgs> = $Result.GetResult<Prisma.$CommunityMemberPayload, S>

  type CommunityMemberCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CommunityMemberFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CommunityMemberCountAggregateInputType | true
    }

  export interface CommunityMemberDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CommunityMember'], meta: { name: 'CommunityMember' } }
    /**
     * Find zero or one CommunityMember that matches the filter.
     * @param {CommunityMemberFindUniqueArgs} args - Arguments to find a CommunityMember
     * @example
     * // Get one CommunityMember
     * const communityMember = await prisma.communityMember.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CommunityMemberFindUniqueArgs>(args: SelectSubset<T, CommunityMemberFindUniqueArgs<ExtArgs>>): Prisma__CommunityMemberClient<$Result.GetResult<Prisma.$CommunityMemberPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CommunityMember that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CommunityMemberFindUniqueOrThrowArgs} args - Arguments to find a CommunityMember
     * @example
     * // Get one CommunityMember
     * const communityMember = await prisma.communityMember.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CommunityMemberFindUniqueOrThrowArgs>(args: SelectSubset<T, CommunityMemberFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CommunityMemberClient<$Result.GetResult<Prisma.$CommunityMemberPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CommunityMember that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommunityMemberFindFirstArgs} args - Arguments to find a CommunityMember
     * @example
     * // Get one CommunityMember
     * const communityMember = await prisma.communityMember.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CommunityMemberFindFirstArgs>(args?: SelectSubset<T, CommunityMemberFindFirstArgs<ExtArgs>>): Prisma__CommunityMemberClient<$Result.GetResult<Prisma.$CommunityMemberPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CommunityMember that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommunityMemberFindFirstOrThrowArgs} args - Arguments to find a CommunityMember
     * @example
     * // Get one CommunityMember
     * const communityMember = await prisma.communityMember.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CommunityMemberFindFirstOrThrowArgs>(args?: SelectSubset<T, CommunityMemberFindFirstOrThrowArgs<ExtArgs>>): Prisma__CommunityMemberClient<$Result.GetResult<Prisma.$CommunityMemberPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CommunityMembers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommunityMemberFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CommunityMembers
     * const communityMembers = await prisma.communityMember.findMany()
     * 
     * // Get first 10 CommunityMembers
     * const communityMembers = await prisma.communityMember.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const communityMemberWithIdOnly = await prisma.communityMember.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CommunityMemberFindManyArgs>(args?: SelectSubset<T, CommunityMemberFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommunityMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CommunityMember.
     * @param {CommunityMemberCreateArgs} args - Arguments to create a CommunityMember.
     * @example
     * // Create one CommunityMember
     * const CommunityMember = await prisma.communityMember.create({
     *   data: {
     *     // ... data to create a CommunityMember
     *   }
     * })
     * 
     */
    create<T extends CommunityMemberCreateArgs>(args: SelectSubset<T, CommunityMemberCreateArgs<ExtArgs>>): Prisma__CommunityMemberClient<$Result.GetResult<Prisma.$CommunityMemberPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CommunityMembers.
     * @param {CommunityMemberCreateManyArgs} args - Arguments to create many CommunityMembers.
     * @example
     * // Create many CommunityMembers
     * const communityMember = await prisma.communityMember.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CommunityMemberCreateManyArgs>(args?: SelectSubset<T, CommunityMemberCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CommunityMembers and returns the data saved in the database.
     * @param {CommunityMemberCreateManyAndReturnArgs} args - Arguments to create many CommunityMembers.
     * @example
     * // Create many CommunityMembers
     * const communityMember = await prisma.communityMember.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CommunityMembers and only return the `id`
     * const communityMemberWithIdOnly = await prisma.communityMember.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CommunityMemberCreateManyAndReturnArgs>(args?: SelectSubset<T, CommunityMemberCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommunityMemberPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CommunityMember.
     * @param {CommunityMemberDeleteArgs} args - Arguments to delete one CommunityMember.
     * @example
     * // Delete one CommunityMember
     * const CommunityMember = await prisma.communityMember.delete({
     *   where: {
     *     // ... filter to delete one CommunityMember
     *   }
     * })
     * 
     */
    delete<T extends CommunityMemberDeleteArgs>(args: SelectSubset<T, CommunityMemberDeleteArgs<ExtArgs>>): Prisma__CommunityMemberClient<$Result.GetResult<Prisma.$CommunityMemberPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CommunityMember.
     * @param {CommunityMemberUpdateArgs} args - Arguments to update one CommunityMember.
     * @example
     * // Update one CommunityMember
     * const communityMember = await prisma.communityMember.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CommunityMemberUpdateArgs>(args: SelectSubset<T, CommunityMemberUpdateArgs<ExtArgs>>): Prisma__CommunityMemberClient<$Result.GetResult<Prisma.$CommunityMemberPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CommunityMembers.
     * @param {CommunityMemberDeleteManyArgs} args - Arguments to filter CommunityMembers to delete.
     * @example
     * // Delete a few CommunityMembers
     * const { count } = await prisma.communityMember.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CommunityMemberDeleteManyArgs>(args?: SelectSubset<T, CommunityMemberDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CommunityMembers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommunityMemberUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CommunityMembers
     * const communityMember = await prisma.communityMember.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CommunityMemberUpdateManyArgs>(args: SelectSubset<T, CommunityMemberUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CommunityMembers and returns the data updated in the database.
     * @param {CommunityMemberUpdateManyAndReturnArgs} args - Arguments to update many CommunityMembers.
     * @example
     * // Update many CommunityMembers
     * const communityMember = await prisma.communityMember.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CommunityMembers and only return the `id`
     * const communityMemberWithIdOnly = await prisma.communityMember.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CommunityMemberUpdateManyAndReturnArgs>(args: SelectSubset<T, CommunityMemberUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommunityMemberPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CommunityMember.
     * @param {CommunityMemberUpsertArgs} args - Arguments to update or create a CommunityMember.
     * @example
     * // Update or create a CommunityMember
     * const communityMember = await prisma.communityMember.upsert({
     *   create: {
     *     // ... data to create a CommunityMember
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CommunityMember we want to update
     *   }
     * })
     */
    upsert<T extends CommunityMemberUpsertArgs>(args: SelectSubset<T, CommunityMemberUpsertArgs<ExtArgs>>): Prisma__CommunityMemberClient<$Result.GetResult<Prisma.$CommunityMemberPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CommunityMembers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommunityMemberCountArgs} args - Arguments to filter CommunityMembers to count.
     * @example
     * // Count the number of CommunityMembers
     * const count = await prisma.communityMember.count({
     *   where: {
     *     // ... the filter for the CommunityMembers we want to count
     *   }
     * })
    **/
    count<T extends CommunityMemberCountArgs>(
      args?: Subset<T, CommunityMemberCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CommunityMemberCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CommunityMember.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommunityMemberAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CommunityMemberAggregateArgs>(args: Subset<T, CommunityMemberAggregateArgs>): Prisma.PrismaPromise<GetCommunityMemberAggregateType<T>>

    /**
     * Group by CommunityMember.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommunityMemberGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CommunityMemberGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CommunityMemberGroupByArgs['orderBy'] }
        : { orderBy?: CommunityMemberGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CommunityMemberGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCommunityMemberGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CommunityMember model
   */
  readonly fields: CommunityMemberFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CommunityMember.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CommunityMemberClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CommunityMember model
   */
  interface CommunityMemberFieldRefs {
    readonly id: FieldRef<"CommunityMember", 'String'>
    readonly createdAt: FieldRef<"CommunityMember", 'DateTime'>
    readonly updatedAt: FieldRef<"CommunityMember", 'DateTime'>
    readonly firstName: FieldRef<"CommunityMember", 'String'>
    readonly middleName: FieldRef<"CommunityMember", 'String'>
    readonly lastName: FieldRef<"CommunityMember", 'String'>
    readonly communityNickname: FieldRef<"CommunityMember", 'String'>
    readonly placeOfBirth: FieldRef<"CommunityMember", 'String'>
    readonly dateOfBirth: FieldRef<"CommunityMember", 'DateTime'>
    readonly age: FieldRef<"CommunityMember", 'Int'>
    readonly gender: FieldRef<"CommunityMember", 'Gender'>
    readonly genderIdentity: FieldRef<"CommunityMember", 'GenderIdentity'>
    readonly nik: FieldRef<"CommunityMember", 'String'>
    readonly idScanUrl: FieldRef<"CommunityMember", 'String'>
    readonly familyCardNumber: FieldRef<"CommunityMember", 'String'>
    readonly ektpStatus: FieldRef<"CommunityMember", 'EKTPStatus'>
    readonly address: FieldRef<"CommunityMember", 'String'>
    readonly domicileKelurahan: FieldRef<"CommunityMember", 'String'>
    readonly domicileKecamatan: FieldRef<"CommunityMember", 'String'>
    readonly domicileRegencyCity: FieldRef<"CommunityMember", 'String'>
    readonly city: FieldRef<"CommunityMember", 'String'>
    readonly residencyStatus: FieldRef<"CommunityMember", 'ResidencyStatus'>
    readonly livingSituation: FieldRef<"CommunityMember", 'LivingSituation'>
    readonly phoneNumber: FieldRef<"CommunityMember", 'String'>
    readonly serviceContactPerson: FieldRef<"CommunityMember", 'String'>
    readonly maritalStatus: FieldRef<"CommunityMember", 'MaritalStatus'>
    readonly lastEducation: FieldRef<"CommunityMember", 'EducationLevel'>
    readonly isStillStudying: FieldRef<"CommunityMember", 'Boolean'>
    readonly employmentStatus: FieldRef<"CommunityMember", 'EmploymentStatus'>
    readonly jobDescription: FieldRef<"CommunityMember", 'String'>
    readonly monthlyIncome: FieldRef<"CommunityMember", 'String'>
    readonly hasOwnBusiness: FieldRef<"CommunityMember", 'Boolean'>
    readonly hasReceivedSkillTraining: FieldRef<"CommunityMember", 'Boolean'>
    readonly skillTrainingType: FieldRef<"CommunityMember", 'String'>
    readonly desiredSkillTraining: FieldRef<"CommunityMember", 'String'>
    readonly businessDetails: FieldRef<"CommunityMember", 'String'>
    readonly hasBpjs: FieldRef<"CommunityMember", 'Boolean'>
    readonly bpjsId: FieldRef<"CommunityMember", 'String'>
    readonly bpjsScanUrl: FieldRef<"CommunityMember", 'String'>
    readonly healthServiceAccess: FieldRef<"CommunityMember", 'HealthServiceAccess'>
    readonly chronicIllness: FieldRef<"CommunityMember", 'String'>
    readonly discriminationExperience: FieldRef<"CommunityMember", 'DiscriminationExperience'>
    readonly discriminationType: FieldRef<"CommunityMember", 'String'>
    readonly discriminationPerpetrator: FieldRef<"CommunityMember", 'String'>
    readonly discriminationLocation: FieldRef<"CommunityMember", 'String'>
    readonly wasDiscriminationReported: FieldRef<"CommunityMember", 'Boolean'>
    readonly receivesSocialAssistance: FieldRef<"CommunityMember", 'Boolean'>
    readonly isRegisteredInDTKS: FieldRef<"CommunityMember", 'Boolean'>
    readonly communityGroup: FieldRef<"CommunityMember", 'String'>
  }
    

  // Custom InputTypes
  /**
   * CommunityMember findUnique
   */
  export type CommunityMemberFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommunityMember
     */
    select?: CommunityMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommunityMember
     */
    omit?: CommunityMemberOmit<ExtArgs> | null
    /**
     * Filter, which CommunityMember to fetch.
     */
    where: CommunityMemberWhereUniqueInput
  }

  /**
   * CommunityMember findUniqueOrThrow
   */
  export type CommunityMemberFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommunityMember
     */
    select?: CommunityMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommunityMember
     */
    omit?: CommunityMemberOmit<ExtArgs> | null
    /**
     * Filter, which CommunityMember to fetch.
     */
    where: CommunityMemberWhereUniqueInput
  }

  /**
   * CommunityMember findFirst
   */
  export type CommunityMemberFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommunityMember
     */
    select?: CommunityMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommunityMember
     */
    omit?: CommunityMemberOmit<ExtArgs> | null
    /**
     * Filter, which CommunityMember to fetch.
     */
    where?: CommunityMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CommunityMembers to fetch.
     */
    orderBy?: CommunityMemberOrderByWithRelationInput | CommunityMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CommunityMembers.
     */
    cursor?: CommunityMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CommunityMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CommunityMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CommunityMembers.
     */
    distinct?: CommunityMemberScalarFieldEnum | CommunityMemberScalarFieldEnum[]
  }

  /**
   * CommunityMember findFirstOrThrow
   */
  export type CommunityMemberFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommunityMember
     */
    select?: CommunityMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommunityMember
     */
    omit?: CommunityMemberOmit<ExtArgs> | null
    /**
     * Filter, which CommunityMember to fetch.
     */
    where?: CommunityMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CommunityMembers to fetch.
     */
    orderBy?: CommunityMemberOrderByWithRelationInput | CommunityMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CommunityMembers.
     */
    cursor?: CommunityMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CommunityMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CommunityMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CommunityMembers.
     */
    distinct?: CommunityMemberScalarFieldEnum | CommunityMemberScalarFieldEnum[]
  }

  /**
   * CommunityMember findMany
   */
  export type CommunityMemberFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommunityMember
     */
    select?: CommunityMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommunityMember
     */
    omit?: CommunityMemberOmit<ExtArgs> | null
    /**
     * Filter, which CommunityMembers to fetch.
     */
    where?: CommunityMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CommunityMembers to fetch.
     */
    orderBy?: CommunityMemberOrderByWithRelationInput | CommunityMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CommunityMembers.
     */
    cursor?: CommunityMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CommunityMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CommunityMembers.
     */
    skip?: number
    distinct?: CommunityMemberScalarFieldEnum | CommunityMemberScalarFieldEnum[]
  }

  /**
   * CommunityMember create
   */
  export type CommunityMemberCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommunityMember
     */
    select?: CommunityMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommunityMember
     */
    omit?: CommunityMemberOmit<ExtArgs> | null
    /**
     * The data needed to create a CommunityMember.
     */
    data: XOR<CommunityMemberCreateInput, CommunityMemberUncheckedCreateInput>
  }

  /**
   * CommunityMember createMany
   */
  export type CommunityMemberCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CommunityMembers.
     */
    data: CommunityMemberCreateManyInput | CommunityMemberCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CommunityMember createManyAndReturn
   */
  export type CommunityMemberCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommunityMember
     */
    select?: CommunityMemberSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CommunityMember
     */
    omit?: CommunityMemberOmit<ExtArgs> | null
    /**
     * The data used to create many CommunityMembers.
     */
    data: CommunityMemberCreateManyInput | CommunityMemberCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CommunityMember update
   */
  export type CommunityMemberUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommunityMember
     */
    select?: CommunityMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommunityMember
     */
    omit?: CommunityMemberOmit<ExtArgs> | null
    /**
     * The data needed to update a CommunityMember.
     */
    data: XOR<CommunityMemberUpdateInput, CommunityMemberUncheckedUpdateInput>
    /**
     * Choose, which CommunityMember to update.
     */
    where: CommunityMemberWhereUniqueInput
  }

  /**
   * CommunityMember updateMany
   */
  export type CommunityMemberUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CommunityMembers.
     */
    data: XOR<CommunityMemberUpdateManyMutationInput, CommunityMemberUncheckedUpdateManyInput>
    /**
     * Filter which CommunityMembers to update
     */
    where?: CommunityMemberWhereInput
    /**
     * Limit how many CommunityMembers to update.
     */
    limit?: number
  }

  /**
   * CommunityMember updateManyAndReturn
   */
  export type CommunityMemberUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommunityMember
     */
    select?: CommunityMemberSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CommunityMember
     */
    omit?: CommunityMemberOmit<ExtArgs> | null
    /**
     * The data used to update CommunityMembers.
     */
    data: XOR<CommunityMemberUpdateManyMutationInput, CommunityMemberUncheckedUpdateManyInput>
    /**
     * Filter which CommunityMembers to update
     */
    where?: CommunityMemberWhereInput
    /**
     * Limit how many CommunityMembers to update.
     */
    limit?: number
  }

  /**
   * CommunityMember upsert
   */
  export type CommunityMemberUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommunityMember
     */
    select?: CommunityMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommunityMember
     */
    omit?: CommunityMemberOmit<ExtArgs> | null
    /**
     * The filter to search for the CommunityMember to update in case it exists.
     */
    where: CommunityMemberWhereUniqueInput
    /**
     * In case the CommunityMember found by the `where` argument doesn't exist, create a new CommunityMember with this data.
     */
    create: XOR<CommunityMemberCreateInput, CommunityMemberUncheckedCreateInput>
    /**
     * In case the CommunityMember was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CommunityMemberUpdateInput, CommunityMemberUncheckedUpdateInput>
  }

  /**
   * CommunityMember delete
   */
  export type CommunityMemberDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommunityMember
     */
    select?: CommunityMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommunityMember
     */
    omit?: CommunityMemberOmit<ExtArgs> | null
    /**
     * Filter which CommunityMember to delete.
     */
    where: CommunityMemberWhereUniqueInput
  }

  /**
   * CommunityMember deleteMany
   */
  export type CommunityMemberDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CommunityMembers to delete
     */
    where?: CommunityMemberWhereInput
    /**
     * Limit how many CommunityMembers to delete.
     */
    limit?: number
  }

  /**
   * CommunityMember without action
   */
  export type CommunityMemberDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommunityMember
     */
    select?: CommunityMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommunityMember
     */
    omit?: CommunityMemberOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const CommunityMemberScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    firstName: 'firstName',
    middleName: 'middleName',
    lastName: 'lastName',
    communityNickname: 'communityNickname',
    placeOfBirth: 'placeOfBirth',
    dateOfBirth: 'dateOfBirth',
    age: 'age',
    gender: 'gender',
    genderIdentity: 'genderIdentity',
    nik: 'nik',
    idScanUrl: 'idScanUrl',
    familyCardNumber: 'familyCardNumber',
    ektpStatus: 'ektpStatus',
    address: 'address',
    domicileKelurahan: 'domicileKelurahan',
    domicileKecamatan: 'domicileKecamatan',
    domicileRegencyCity: 'domicileRegencyCity',
    city: 'city',
    residencyStatus: 'residencyStatus',
    livingSituation: 'livingSituation',
    phoneNumber: 'phoneNumber',
    serviceContactPerson: 'serviceContactPerson',
    maritalStatus: 'maritalStatus',
    lastEducation: 'lastEducation',
    isStillStudying: 'isStillStudying',
    employmentStatus: 'employmentStatus',
    jobDescription: 'jobDescription',
    monthlyIncome: 'monthlyIncome',
    hasOwnBusiness: 'hasOwnBusiness',
    hasReceivedSkillTraining: 'hasReceivedSkillTraining',
    skillTrainingType: 'skillTrainingType',
    desiredSkillTraining: 'desiredSkillTraining',
    businessDetails: 'businessDetails',
    hasBpjs: 'hasBpjs',
    bpjsId: 'bpjsId',
    bpjsScanUrl: 'bpjsScanUrl',
    healthServiceAccess: 'healthServiceAccess',
    chronicIllness: 'chronicIllness',
    discriminationExperience: 'discriminationExperience',
    discriminationType: 'discriminationType',
    discriminationPerpetrator: 'discriminationPerpetrator',
    discriminationLocation: 'discriminationLocation',
    wasDiscriminationReported: 'wasDiscriminationReported',
    receivesSocialAssistance: 'receivesSocialAssistance',
    isRegisteredInDTKS: 'isRegisteredInDTKS',
    communityGroup: 'communityGroup'
  };

  export type CommunityMemberScalarFieldEnum = (typeof CommunityMemberScalarFieldEnum)[keyof typeof CommunityMemberScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Gender'
   */
  export type EnumGenderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Gender'>
    


  /**
   * Reference to a field of type 'Gender[]'
   */
  export type ListEnumGenderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Gender[]'>
    


  /**
   * Reference to a field of type 'GenderIdentity'
   */
  export type EnumGenderIdentityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'GenderIdentity'>
    


  /**
   * Reference to a field of type 'GenderIdentity[]'
   */
  export type ListEnumGenderIdentityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'GenderIdentity[]'>
    


  /**
   * Reference to a field of type 'EKTPStatus'
   */
  export type EnumEKTPStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EKTPStatus'>
    


  /**
   * Reference to a field of type 'EKTPStatus[]'
   */
  export type ListEnumEKTPStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EKTPStatus[]'>
    


  /**
   * Reference to a field of type 'ResidencyStatus'
   */
  export type EnumResidencyStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ResidencyStatus'>
    


  /**
   * Reference to a field of type 'ResidencyStatus[]'
   */
  export type ListEnumResidencyStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ResidencyStatus[]'>
    


  /**
   * Reference to a field of type 'LivingSituation'
   */
  export type EnumLivingSituationFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LivingSituation'>
    


  /**
   * Reference to a field of type 'LivingSituation[]'
   */
  export type ListEnumLivingSituationFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LivingSituation[]'>
    


  /**
   * Reference to a field of type 'MaritalStatus'
   */
  export type EnumMaritalStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MaritalStatus'>
    


  /**
   * Reference to a field of type 'MaritalStatus[]'
   */
  export type ListEnumMaritalStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MaritalStatus[]'>
    


  /**
   * Reference to a field of type 'EducationLevel'
   */
  export type EnumEducationLevelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EducationLevel'>
    


  /**
   * Reference to a field of type 'EducationLevel[]'
   */
  export type ListEnumEducationLevelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EducationLevel[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'EmploymentStatus'
   */
  export type EnumEmploymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EmploymentStatus'>
    


  /**
   * Reference to a field of type 'EmploymentStatus[]'
   */
  export type ListEnumEmploymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EmploymentStatus[]'>
    


  /**
   * Reference to a field of type 'HealthServiceAccess'
   */
  export type EnumHealthServiceAccessFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'HealthServiceAccess'>
    


  /**
   * Reference to a field of type 'HealthServiceAccess[]'
   */
  export type ListEnumHealthServiceAccessFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'HealthServiceAccess[]'>
    


  /**
   * Reference to a field of type 'DiscriminationExperience'
   */
  export type EnumDiscriminationExperienceFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DiscriminationExperience'>
    


  /**
   * Reference to a field of type 'DiscriminationExperience[]'
   */
  export type ListEnumDiscriminationExperienceFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DiscriminationExperience[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type CommunityMemberWhereInput = {
    AND?: CommunityMemberWhereInput | CommunityMemberWhereInput[]
    OR?: CommunityMemberWhereInput[]
    NOT?: CommunityMemberWhereInput | CommunityMemberWhereInput[]
    id?: StringFilter<"CommunityMember"> | string
    createdAt?: DateTimeFilter<"CommunityMember"> | Date | string
    updatedAt?: DateTimeFilter<"CommunityMember"> | Date | string
    firstName?: StringFilter<"CommunityMember"> | string
    middleName?: StringNullableFilter<"CommunityMember"> | string | null
    lastName?: StringNullableFilter<"CommunityMember"> | string | null
    communityNickname?: StringNullableFilter<"CommunityMember"> | string | null
    placeOfBirth?: StringNullableFilter<"CommunityMember"> | string | null
    dateOfBirth?: DateTimeNullableFilter<"CommunityMember"> | Date | string | null
    age?: IntNullableFilter<"CommunityMember"> | number | null
    gender?: EnumGenderNullableFilter<"CommunityMember"> | $Enums.Gender | null
    genderIdentity?: EnumGenderIdentityNullableFilter<"CommunityMember"> | $Enums.GenderIdentity | null
    nik?: StringNullableFilter<"CommunityMember"> | string | null
    idScanUrl?: StringNullableFilter<"CommunityMember"> | string | null
    familyCardNumber?: StringNullableFilter<"CommunityMember"> | string | null
    ektpStatus?: EnumEKTPStatusNullableFilter<"CommunityMember"> | $Enums.EKTPStatus | null
    address?: StringNullableFilter<"CommunityMember"> | string | null
    domicileKelurahan?: StringNullableFilter<"CommunityMember"> | string | null
    domicileKecamatan?: StringNullableFilter<"CommunityMember"> | string | null
    domicileRegencyCity?: StringNullableFilter<"CommunityMember"> | string | null
    city?: StringNullableFilter<"CommunityMember"> | string | null
    residencyStatus?: EnumResidencyStatusNullableFilter<"CommunityMember"> | $Enums.ResidencyStatus | null
    livingSituation?: EnumLivingSituationNullableFilter<"CommunityMember"> | $Enums.LivingSituation | null
    phoneNumber?: StringNullableFilter<"CommunityMember"> | string | null
    serviceContactPerson?: StringNullableFilter<"CommunityMember"> | string | null
    maritalStatus?: EnumMaritalStatusNullableFilter<"CommunityMember"> | $Enums.MaritalStatus | null
    lastEducation?: EnumEducationLevelNullableFilter<"CommunityMember"> | $Enums.EducationLevel | null
    isStillStudying?: BoolNullableFilter<"CommunityMember"> | boolean | null
    employmentStatus?: EnumEmploymentStatusNullableFilter<"CommunityMember"> | $Enums.EmploymentStatus | null
    jobDescription?: StringNullableFilter<"CommunityMember"> | string | null
    monthlyIncome?: StringNullableFilter<"CommunityMember"> | string | null
    hasOwnBusiness?: BoolNullableFilter<"CommunityMember"> | boolean | null
    hasReceivedSkillTraining?: BoolNullableFilter<"CommunityMember"> | boolean | null
    skillTrainingType?: StringNullableFilter<"CommunityMember"> | string | null
    desiredSkillTraining?: StringNullableFilter<"CommunityMember"> | string | null
    businessDetails?: StringNullableFilter<"CommunityMember"> | string | null
    hasBpjs?: BoolFilter<"CommunityMember"> | boolean
    bpjsId?: StringNullableFilter<"CommunityMember"> | string | null
    bpjsScanUrl?: StringNullableFilter<"CommunityMember"> | string | null
    healthServiceAccess?: EnumHealthServiceAccessNullableFilter<"CommunityMember"> | $Enums.HealthServiceAccess | null
    chronicIllness?: StringNullableFilter<"CommunityMember"> | string | null
    discriminationExperience?: EnumDiscriminationExperienceNullableFilter<"CommunityMember"> | $Enums.DiscriminationExperience | null
    discriminationType?: StringNullableFilter<"CommunityMember"> | string | null
    discriminationPerpetrator?: StringNullableFilter<"CommunityMember"> | string | null
    discriminationLocation?: StringNullableFilter<"CommunityMember"> | string | null
    wasDiscriminationReported?: BoolNullableFilter<"CommunityMember"> | boolean | null
    receivesSocialAssistance?: BoolNullableFilter<"CommunityMember"> | boolean | null
    isRegisteredInDTKS?: BoolNullableFilter<"CommunityMember"> | boolean | null
    communityGroup?: StringNullableFilter<"CommunityMember"> | string | null
  }

  export type CommunityMemberOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    firstName?: SortOrder
    middleName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    communityNickname?: SortOrderInput | SortOrder
    placeOfBirth?: SortOrderInput | SortOrder
    dateOfBirth?: SortOrderInput | SortOrder
    age?: SortOrderInput | SortOrder
    gender?: SortOrderInput | SortOrder
    genderIdentity?: SortOrderInput | SortOrder
    nik?: SortOrderInput | SortOrder
    idScanUrl?: SortOrderInput | SortOrder
    familyCardNumber?: SortOrderInput | SortOrder
    ektpStatus?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    domicileKelurahan?: SortOrderInput | SortOrder
    domicileKecamatan?: SortOrderInput | SortOrder
    domicileRegencyCity?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    residencyStatus?: SortOrderInput | SortOrder
    livingSituation?: SortOrderInput | SortOrder
    phoneNumber?: SortOrderInput | SortOrder
    serviceContactPerson?: SortOrderInput | SortOrder
    maritalStatus?: SortOrderInput | SortOrder
    lastEducation?: SortOrderInput | SortOrder
    isStillStudying?: SortOrderInput | SortOrder
    employmentStatus?: SortOrderInput | SortOrder
    jobDescription?: SortOrderInput | SortOrder
    monthlyIncome?: SortOrderInput | SortOrder
    hasOwnBusiness?: SortOrderInput | SortOrder
    hasReceivedSkillTraining?: SortOrderInput | SortOrder
    skillTrainingType?: SortOrderInput | SortOrder
    desiredSkillTraining?: SortOrderInput | SortOrder
    businessDetails?: SortOrderInput | SortOrder
    hasBpjs?: SortOrder
    bpjsId?: SortOrderInput | SortOrder
    bpjsScanUrl?: SortOrderInput | SortOrder
    healthServiceAccess?: SortOrderInput | SortOrder
    chronicIllness?: SortOrderInput | SortOrder
    discriminationExperience?: SortOrderInput | SortOrder
    discriminationType?: SortOrderInput | SortOrder
    discriminationPerpetrator?: SortOrderInput | SortOrder
    discriminationLocation?: SortOrderInput | SortOrder
    wasDiscriminationReported?: SortOrderInput | SortOrder
    receivesSocialAssistance?: SortOrderInput | SortOrder
    isRegisteredInDTKS?: SortOrderInput | SortOrder
    communityGroup?: SortOrderInput | SortOrder
  }

  export type CommunityMemberWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    nik?: string
    bpjsId?: string
    AND?: CommunityMemberWhereInput | CommunityMemberWhereInput[]
    OR?: CommunityMemberWhereInput[]
    NOT?: CommunityMemberWhereInput | CommunityMemberWhereInput[]
    createdAt?: DateTimeFilter<"CommunityMember"> | Date | string
    updatedAt?: DateTimeFilter<"CommunityMember"> | Date | string
    firstName?: StringFilter<"CommunityMember"> | string
    middleName?: StringNullableFilter<"CommunityMember"> | string | null
    lastName?: StringNullableFilter<"CommunityMember"> | string | null
    communityNickname?: StringNullableFilter<"CommunityMember"> | string | null
    placeOfBirth?: StringNullableFilter<"CommunityMember"> | string | null
    dateOfBirth?: DateTimeNullableFilter<"CommunityMember"> | Date | string | null
    age?: IntNullableFilter<"CommunityMember"> | number | null
    gender?: EnumGenderNullableFilter<"CommunityMember"> | $Enums.Gender | null
    genderIdentity?: EnumGenderIdentityNullableFilter<"CommunityMember"> | $Enums.GenderIdentity | null
    idScanUrl?: StringNullableFilter<"CommunityMember"> | string | null
    familyCardNumber?: StringNullableFilter<"CommunityMember"> | string | null
    ektpStatus?: EnumEKTPStatusNullableFilter<"CommunityMember"> | $Enums.EKTPStatus | null
    address?: StringNullableFilter<"CommunityMember"> | string | null
    domicileKelurahan?: StringNullableFilter<"CommunityMember"> | string | null
    domicileKecamatan?: StringNullableFilter<"CommunityMember"> | string | null
    domicileRegencyCity?: StringNullableFilter<"CommunityMember"> | string | null
    city?: StringNullableFilter<"CommunityMember"> | string | null
    residencyStatus?: EnumResidencyStatusNullableFilter<"CommunityMember"> | $Enums.ResidencyStatus | null
    livingSituation?: EnumLivingSituationNullableFilter<"CommunityMember"> | $Enums.LivingSituation | null
    phoneNumber?: StringNullableFilter<"CommunityMember"> | string | null
    serviceContactPerson?: StringNullableFilter<"CommunityMember"> | string | null
    maritalStatus?: EnumMaritalStatusNullableFilter<"CommunityMember"> | $Enums.MaritalStatus | null
    lastEducation?: EnumEducationLevelNullableFilter<"CommunityMember"> | $Enums.EducationLevel | null
    isStillStudying?: BoolNullableFilter<"CommunityMember"> | boolean | null
    employmentStatus?: EnumEmploymentStatusNullableFilter<"CommunityMember"> | $Enums.EmploymentStatus | null
    jobDescription?: StringNullableFilter<"CommunityMember"> | string | null
    monthlyIncome?: StringNullableFilter<"CommunityMember"> | string | null
    hasOwnBusiness?: BoolNullableFilter<"CommunityMember"> | boolean | null
    hasReceivedSkillTraining?: BoolNullableFilter<"CommunityMember"> | boolean | null
    skillTrainingType?: StringNullableFilter<"CommunityMember"> | string | null
    desiredSkillTraining?: StringNullableFilter<"CommunityMember"> | string | null
    businessDetails?: StringNullableFilter<"CommunityMember"> | string | null
    hasBpjs?: BoolFilter<"CommunityMember"> | boolean
    bpjsScanUrl?: StringNullableFilter<"CommunityMember"> | string | null
    healthServiceAccess?: EnumHealthServiceAccessNullableFilter<"CommunityMember"> | $Enums.HealthServiceAccess | null
    chronicIllness?: StringNullableFilter<"CommunityMember"> | string | null
    discriminationExperience?: EnumDiscriminationExperienceNullableFilter<"CommunityMember"> | $Enums.DiscriminationExperience | null
    discriminationType?: StringNullableFilter<"CommunityMember"> | string | null
    discriminationPerpetrator?: StringNullableFilter<"CommunityMember"> | string | null
    discriminationLocation?: StringNullableFilter<"CommunityMember"> | string | null
    wasDiscriminationReported?: BoolNullableFilter<"CommunityMember"> | boolean | null
    receivesSocialAssistance?: BoolNullableFilter<"CommunityMember"> | boolean | null
    isRegisteredInDTKS?: BoolNullableFilter<"CommunityMember"> | boolean | null
    communityGroup?: StringNullableFilter<"CommunityMember"> | string | null
  }, "id" | "nik" | "bpjsId">

  export type CommunityMemberOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    firstName?: SortOrder
    middleName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    communityNickname?: SortOrderInput | SortOrder
    placeOfBirth?: SortOrderInput | SortOrder
    dateOfBirth?: SortOrderInput | SortOrder
    age?: SortOrderInput | SortOrder
    gender?: SortOrderInput | SortOrder
    genderIdentity?: SortOrderInput | SortOrder
    nik?: SortOrderInput | SortOrder
    idScanUrl?: SortOrderInput | SortOrder
    familyCardNumber?: SortOrderInput | SortOrder
    ektpStatus?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    domicileKelurahan?: SortOrderInput | SortOrder
    domicileKecamatan?: SortOrderInput | SortOrder
    domicileRegencyCity?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    residencyStatus?: SortOrderInput | SortOrder
    livingSituation?: SortOrderInput | SortOrder
    phoneNumber?: SortOrderInput | SortOrder
    serviceContactPerson?: SortOrderInput | SortOrder
    maritalStatus?: SortOrderInput | SortOrder
    lastEducation?: SortOrderInput | SortOrder
    isStillStudying?: SortOrderInput | SortOrder
    employmentStatus?: SortOrderInput | SortOrder
    jobDescription?: SortOrderInput | SortOrder
    monthlyIncome?: SortOrderInput | SortOrder
    hasOwnBusiness?: SortOrderInput | SortOrder
    hasReceivedSkillTraining?: SortOrderInput | SortOrder
    skillTrainingType?: SortOrderInput | SortOrder
    desiredSkillTraining?: SortOrderInput | SortOrder
    businessDetails?: SortOrderInput | SortOrder
    hasBpjs?: SortOrder
    bpjsId?: SortOrderInput | SortOrder
    bpjsScanUrl?: SortOrderInput | SortOrder
    healthServiceAccess?: SortOrderInput | SortOrder
    chronicIllness?: SortOrderInput | SortOrder
    discriminationExperience?: SortOrderInput | SortOrder
    discriminationType?: SortOrderInput | SortOrder
    discriminationPerpetrator?: SortOrderInput | SortOrder
    discriminationLocation?: SortOrderInput | SortOrder
    wasDiscriminationReported?: SortOrderInput | SortOrder
    receivesSocialAssistance?: SortOrderInput | SortOrder
    isRegisteredInDTKS?: SortOrderInput | SortOrder
    communityGroup?: SortOrderInput | SortOrder
    _count?: CommunityMemberCountOrderByAggregateInput
    _avg?: CommunityMemberAvgOrderByAggregateInput
    _max?: CommunityMemberMaxOrderByAggregateInput
    _min?: CommunityMemberMinOrderByAggregateInput
    _sum?: CommunityMemberSumOrderByAggregateInput
  }

  export type CommunityMemberScalarWhereWithAggregatesInput = {
    AND?: CommunityMemberScalarWhereWithAggregatesInput | CommunityMemberScalarWhereWithAggregatesInput[]
    OR?: CommunityMemberScalarWhereWithAggregatesInput[]
    NOT?: CommunityMemberScalarWhereWithAggregatesInput | CommunityMemberScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CommunityMember"> | string
    createdAt?: DateTimeWithAggregatesFilter<"CommunityMember"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CommunityMember"> | Date | string
    firstName?: StringWithAggregatesFilter<"CommunityMember"> | string
    middleName?: StringNullableWithAggregatesFilter<"CommunityMember"> | string | null
    lastName?: StringNullableWithAggregatesFilter<"CommunityMember"> | string | null
    communityNickname?: StringNullableWithAggregatesFilter<"CommunityMember"> | string | null
    placeOfBirth?: StringNullableWithAggregatesFilter<"CommunityMember"> | string | null
    dateOfBirth?: DateTimeNullableWithAggregatesFilter<"CommunityMember"> | Date | string | null
    age?: IntNullableWithAggregatesFilter<"CommunityMember"> | number | null
    gender?: EnumGenderNullableWithAggregatesFilter<"CommunityMember"> | $Enums.Gender | null
    genderIdentity?: EnumGenderIdentityNullableWithAggregatesFilter<"CommunityMember"> | $Enums.GenderIdentity | null
    nik?: StringNullableWithAggregatesFilter<"CommunityMember"> | string | null
    idScanUrl?: StringNullableWithAggregatesFilter<"CommunityMember"> | string | null
    familyCardNumber?: StringNullableWithAggregatesFilter<"CommunityMember"> | string | null
    ektpStatus?: EnumEKTPStatusNullableWithAggregatesFilter<"CommunityMember"> | $Enums.EKTPStatus | null
    address?: StringNullableWithAggregatesFilter<"CommunityMember"> | string | null
    domicileKelurahan?: StringNullableWithAggregatesFilter<"CommunityMember"> | string | null
    domicileKecamatan?: StringNullableWithAggregatesFilter<"CommunityMember"> | string | null
    domicileRegencyCity?: StringNullableWithAggregatesFilter<"CommunityMember"> | string | null
    city?: StringNullableWithAggregatesFilter<"CommunityMember"> | string | null
    residencyStatus?: EnumResidencyStatusNullableWithAggregatesFilter<"CommunityMember"> | $Enums.ResidencyStatus | null
    livingSituation?: EnumLivingSituationNullableWithAggregatesFilter<"CommunityMember"> | $Enums.LivingSituation | null
    phoneNumber?: StringNullableWithAggregatesFilter<"CommunityMember"> | string | null
    serviceContactPerson?: StringNullableWithAggregatesFilter<"CommunityMember"> | string | null
    maritalStatus?: EnumMaritalStatusNullableWithAggregatesFilter<"CommunityMember"> | $Enums.MaritalStatus | null
    lastEducation?: EnumEducationLevelNullableWithAggregatesFilter<"CommunityMember"> | $Enums.EducationLevel | null
    isStillStudying?: BoolNullableWithAggregatesFilter<"CommunityMember"> | boolean | null
    employmentStatus?: EnumEmploymentStatusNullableWithAggregatesFilter<"CommunityMember"> | $Enums.EmploymentStatus | null
    jobDescription?: StringNullableWithAggregatesFilter<"CommunityMember"> | string | null
    monthlyIncome?: StringNullableWithAggregatesFilter<"CommunityMember"> | string | null
    hasOwnBusiness?: BoolNullableWithAggregatesFilter<"CommunityMember"> | boolean | null
    hasReceivedSkillTraining?: BoolNullableWithAggregatesFilter<"CommunityMember"> | boolean | null
    skillTrainingType?: StringNullableWithAggregatesFilter<"CommunityMember"> | string | null
    desiredSkillTraining?: StringNullableWithAggregatesFilter<"CommunityMember"> | string | null
    businessDetails?: StringNullableWithAggregatesFilter<"CommunityMember"> | string | null
    hasBpjs?: BoolWithAggregatesFilter<"CommunityMember"> | boolean
    bpjsId?: StringNullableWithAggregatesFilter<"CommunityMember"> | string | null
    bpjsScanUrl?: StringNullableWithAggregatesFilter<"CommunityMember"> | string | null
    healthServiceAccess?: EnumHealthServiceAccessNullableWithAggregatesFilter<"CommunityMember"> | $Enums.HealthServiceAccess | null
    chronicIllness?: StringNullableWithAggregatesFilter<"CommunityMember"> | string | null
    discriminationExperience?: EnumDiscriminationExperienceNullableWithAggregatesFilter<"CommunityMember"> | $Enums.DiscriminationExperience | null
    discriminationType?: StringNullableWithAggregatesFilter<"CommunityMember"> | string | null
    discriminationPerpetrator?: StringNullableWithAggregatesFilter<"CommunityMember"> | string | null
    discriminationLocation?: StringNullableWithAggregatesFilter<"CommunityMember"> | string | null
    wasDiscriminationReported?: BoolNullableWithAggregatesFilter<"CommunityMember"> | boolean | null
    receivesSocialAssistance?: BoolNullableWithAggregatesFilter<"CommunityMember"> | boolean | null
    isRegisteredInDTKS?: BoolNullableWithAggregatesFilter<"CommunityMember"> | boolean | null
    communityGroup?: StringNullableWithAggregatesFilter<"CommunityMember"> | string | null
  }

  export type CommunityMemberCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    firstName: string
    middleName?: string | null
    lastName?: string | null
    communityNickname?: string | null
    placeOfBirth?: string | null
    dateOfBirth?: Date | string | null
    age?: number | null
    gender?: $Enums.Gender | null
    genderIdentity?: $Enums.GenderIdentity | null
    nik?: string | null
    idScanUrl?: string | null
    familyCardNumber?: string | null
    ektpStatus?: $Enums.EKTPStatus | null
    address?: string | null
    domicileKelurahan?: string | null
    domicileKecamatan?: string | null
    domicileRegencyCity?: string | null
    city?: string | null
    residencyStatus?: $Enums.ResidencyStatus | null
    livingSituation?: $Enums.LivingSituation | null
    phoneNumber?: string | null
    serviceContactPerson?: string | null
    maritalStatus?: $Enums.MaritalStatus | null
    lastEducation?: $Enums.EducationLevel | null
    isStillStudying?: boolean | null
    employmentStatus?: $Enums.EmploymentStatus | null
    jobDescription?: string | null
    monthlyIncome?: string | null
    hasOwnBusiness?: boolean | null
    hasReceivedSkillTraining?: boolean | null
    skillTrainingType?: string | null
    desiredSkillTraining?: string | null
    businessDetails?: string | null
    hasBpjs?: boolean
    bpjsId?: string | null
    bpjsScanUrl?: string | null
    healthServiceAccess?: $Enums.HealthServiceAccess | null
    chronicIllness?: string | null
    discriminationExperience?: $Enums.DiscriminationExperience | null
    discriminationType?: string | null
    discriminationPerpetrator?: string | null
    discriminationLocation?: string | null
    wasDiscriminationReported?: boolean | null
    receivesSocialAssistance?: boolean | null
    isRegisteredInDTKS?: boolean | null
    communityGroup?: string | null
  }

  export type CommunityMemberUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    firstName: string
    middleName?: string | null
    lastName?: string | null
    communityNickname?: string | null
    placeOfBirth?: string | null
    dateOfBirth?: Date | string | null
    age?: number | null
    gender?: $Enums.Gender | null
    genderIdentity?: $Enums.GenderIdentity | null
    nik?: string | null
    idScanUrl?: string | null
    familyCardNumber?: string | null
    ektpStatus?: $Enums.EKTPStatus | null
    address?: string | null
    domicileKelurahan?: string | null
    domicileKecamatan?: string | null
    domicileRegencyCity?: string | null
    city?: string | null
    residencyStatus?: $Enums.ResidencyStatus | null
    livingSituation?: $Enums.LivingSituation | null
    phoneNumber?: string | null
    serviceContactPerson?: string | null
    maritalStatus?: $Enums.MaritalStatus | null
    lastEducation?: $Enums.EducationLevel | null
    isStillStudying?: boolean | null
    employmentStatus?: $Enums.EmploymentStatus | null
    jobDescription?: string | null
    monthlyIncome?: string | null
    hasOwnBusiness?: boolean | null
    hasReceivedSkillTraining?: boolean | null
    skillTrainingType?: string | null
    desiredSkillTraining?: string | null
    businessDetails?: string | null
    hasBpjs?: boolean
    bpjsId?: string | null
    bpjsScanUrl?: string | null
    healthServiceAccess?: $Enums.HealthServiceAccess | null
    chronicIllness?: string | null
    discriminationExperience?: $Enums.DiscriminationExperience | null
    discriminationType?: string | null
    discriminationPerpetrator?: string | null
    discriminationLocation?: string | null
    wasDiscriminationReported?: boolean | null
    receivesSocialAssistance?: boolean | null
    isRegisteredInDTKS?: boolean | null
    communityGroup?: string | null
  }

  export type CommunityMemberUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    communityNickname?: NullableStringFieldUpdateOperationsInput | string | null
    placeOfBirth?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    age?: NullableIntFieldUpdateOperationsInput | number | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    genderIdentity?: NullableEnumGenderIdentityFieldUpdateOperationsInput | $Enums.GenderIdentity | null
    nik?: NullableStringFieldUpdateOperationsInput | string | null
    idScanUrl?: NullableStringFieldUpdateOperationsInput | string | null
    familyCardNumber?: NullableStringFieldUpdateOperationsInput | string | null
    ektpStatus?: NullableEnumEKTPStatusFieldUpdateOperationsInput | $Enums.EKTPStatus | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    domicileKelurahan?: NullableStringFieldUpdateOperationsInput | string | null
    domicileKecamatan?: NullableStringFieldUpdateOperationsInput | string | null
    domicileRegencyCity?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    residencyStatus?: NullableEnumResidencyStatusFieldUpdateOperationsInput | $Enums.ResidencyStatus | null
    livingSituation?: NullableEnumLivingSituationFieldUpdateOperationsInput | $Enums.LivingSituation | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    serviceContactPerson?: NullableStringFieldUpdateOperationsInput | string | null
    maritalStatus?: NullableEnumMaritalStatusFieldUpdateOperationsInput | $Enums.MaritalStatus | null
    lastEducation?: NullableEnumEducationLevelFieldUpdateOperationsInput | $Enums.EducationLevel | null
    isStillStudying?: NullableBoolFieldUpdateOperationsInput | boolean | null
    employmentStatus?: NullableEnumEmploymentStatusFieldUpdateOperationsInput | $Enums.EmploymentStatus | null
    jobDescription?: NullableStringFieldUpdateOperationsInput | string | null
    monthlyIncome?: NullableStringFieldUpdateOperationsInput | string | null
    hasOwnBusiness?: NullableBoolFieldUpdateOperationsInput | boolean | null
    hasReceivedSkillTraining?: NullableBoolFieldUpdateOperationsInput | boolean | null
    skillTrainingType?: NullableStringFieldUpdateOperationsInput | string | null
    desiredSkillTraining?: NullableStringFieldUpdateOperationsInput | string | null
    businessDetails?: NullableStringFieldUpdateOperationsInput | string | null
    hasBpjs?: BoolFieldUpdateOperationsInput | boolean
    bpjsId?: NullableStringFieldUpdateOperationsInput | string | null
    bpjsScanUrl?: NullableStringFieldUpdateOperationsInput | string | null
    healthServiceAccess?: NullableEnumHealthServiceAccessFieldUpdateOperationsInput | $Enums.HealthServiceAccess | null
    chronicIllness?: NullableStringFieldUpdateOperationsInput | string | null
    discriminationExperience?: NullableEnumDiscriminationExperienceFieldUpdateOperationsInput | $Enums.DiscriminationExperience | null
    discriminationType?: NullableStringFieldUpdateOperationsInput | string | null
    discriminationPerpetrator?: NullableStringFieldUpdateOperationsInput | string | null
    discriminationLocation?: NullableStringFieldUpdateOperationsInput | string | null
    wasDiscriminationReported?: NullableBoolFieldUpdateOperationsInput | boolean | null
    receivesSocialAssistance?: NullableBoolFieldUpdateOperationsInput | boolean | null
    isRegisteredInDTKS?: NullableBoolFieldUpdateOperationsInput | boolean | null
    communityGroup?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CommunityMemberUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    communityNickname?: NullableStringFieldUpdateOperationsInput | string | null
    placeOfBirth?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    age?: NullableIntFieldUpdateOperationsInput | number | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    genderIdentity?: NullableEnumGenderIdentityFieldUpdateOperationsInput | $Enums.GenderIdentity | null
    nik?: NullableStringFieldUpdateOperationsInput | string | null
    idScanUrl?: NullableStringFieldUpdateOperationsInput | string | null
    familyCardNumber?: NullableStringFieldUpdateOperationsInput | string | null
    ektpStatus?: NullableEnumEKTPStatusFieldUpdateOperationsInput | $Enums.EKTPStatus | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    domicileKelurahan?: NullableStringFieldUpdateOperationsInput | string | null
    domicileKecamatan?: NullableStringFieldUpdateOperationsInput | string | null
    domicileRegencyCity?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    residencyStatus?: NullableEnumResidencyStatusFieldUpdateOperationsInput | $Enums.ResidencyStatus | null
    livingSituation?: NullableEnumLivingSituationFieldUpdateOperationsInput | $Enums.LivingSituation | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    serviceContactPerson?: NullableStringFieldUpdateOperationsInput | string | null
    maritalStatus?: NullableEnumMaritalStatusFieldUpdateOperationsInput | $Enums.MaritalStatus | null
    lastEducation?: NullableEnumEducationLevelFieldUpdateOperationsInput | $Enums.EducationLevel | null
    isStillStudying?: NullableBoolFieldUpdateOperationsInput | boolean | null
    employmentStatus?: NullableEnumEmploymentStatusFieldUpdateOperationsInput | $Enums.EmploymentStatus | null
    jobDescription?: NullableStringFieldUpdateOperationsInput | string | null
    monthlyIncome?: NullableStringFieldUpdateOperationsInput | string | null
    hasOwnBusiness?: NullableBoolFieldUpdateOperationsInput | boolean | null
    hasReceivedSkillTraining?: NullableBoolFieldUpdateOperationsInput | boolean | null
    skillTrainingType?: NullableStringFieldUpdateOperationsInput | string | null
    desiredSkillTraining?: NullableStringFieldUpdateOperationsInput | string | null
    businessDetails?: NullableStringFieldUpdateOperationsInput | string | null
    hasBpjs?: BoolFieldUpdateOperationsInput | boolean
    bpjsId?: NullableStringFieldUpdateOperationsInput | string | null
    bpjsScanUrl?: NullableStringFieldUpdateOperationsInput | string | null
    healthServiceAccess?: NullableEnumHealthServiceAccessFieldUpdateOperationsInput | $Enums.HealthServiceAccess | null
    chronicIllness?: NullableStringFieldUpdateOperationsInput | string | null
    discriminationExperience?: NullableEnumDiscriminationExperienceFieldUpdateOperationsInput | $Enums.DiscriminationExperience | null
    discriminationType?: NullableStringFieldUpdateOperationsInput | string | null
    discriminationPerpetrator?: NullableStringFieldUpdateOperationsInput | string | null
    discriminationLocation?: NullableStringFieldUpdateOperationsInput | string | null
    wasDiscriminationReported?: NullableBoolFieldUpdateOperationsInput | boolean | null
    receivesSocialAssistance?: NullableBoolFieldUpdateOperationsInput | boolean | null
    isRegisteredInDTKS?: NullableBoolFieldUpdateOperationsInput | boolean | null
    communityGroup?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CommunityMemberCreateManyInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    firstName: string
    middleName?: string | null
    lastName?: string | null
    communityNickname?: string | null
    placeOfBirth?: string | null
    dateOfBirth?: Date | string | null
    age?: number | null
    gender?: $Enums.Gender | null
    genderIdentity?: $Enums.GenderIdentity | null
    nik?: string | null
    idScanUrl?: string | null
    familyCardNumber?: string | null
    ektpStatus?: $Enums.EKTPStatus | null
    address?: string | null
    domicileKelurahan?: string | null
    domicileKecamatan?: string | null
    domicileRegencyCity?: string | null
    city?: string | null
    residencyStatus?: $Enums.ResidencyStatus | null
    livingSituation?: $Enums.LivingSituation | null
    phoneNumber?: string | null
    serviceContactPerson?: string | null
    maritalStatus?: $Enums.MaritalStatus | null
    lastEducation?: $Enums.EducationLevel | null
    isStillStudying?: boolean | null
    employmentStatus?: $Enums.EmploymentStatus | null
    jobDescription?: string | null
    monthlyIncome?: string | null
    hasOwnBusiness?: boolean | null
    hasReceivedSkillTraining?: boolean | null
    skillTrainingType?: string | null
    desiredSkillTraining?: string | null
    businessDetails?: string | null
    hasBpjs?: boolean
    bpjsId?: string | null
    bpjsScanUrl?: string | null
    healthServiceAccess?: $Enums.HealthServiceAccess | null
    chronicIllness?: string | null
    discriminationExperience?: $Enums.DiscriminationExperience | null
    discriminationType?: string | null
    discriminationPerpetrator?: string | null
    discriminationLocation?: string | null
    wasDiscriminationReported?: boolean | null
    receivesSocialAssistance?: boolean | null
    isRegisteredInDTKS?: boolean | null
    communityGroup?: string | null
  }

  export type CommunityMemberUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    communityNickname?: NullableStringFieldUpdateOperationsInput | string | null
    placeOfBirth?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    age?: NullableIntFieldUpdateOperationsInput | number | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    genderIdentity?: NullableEnumGenderIdentityFieldUpdateOperationsInput | $Enums.GenderIdentity | null
    nik?: NullableStringFieldUpdateOperationsInput | string | null
    idScanUrl?: NullableStringFieldUpdateOperationsInput | string | null
    familyCardNumber?: NullableStringFieldUpdateOperationsInput | string | null
    ektpStatus?: NullableEnumEKTPStatusFieldUpdateOperationsInput | $Enums.EKTPStatus | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    domicileKelurahan?: NullableStringFieldUpdateOperationsInput | string | null
    domicileKecamatan?: NullableStringFieldUpdateOperationsInput | string | null
    domicileRegencyCity?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    residencyStatus?: NullableEnumResidencyStatusFieldUpdateOperationsInput | $Enums.ResidencyStatus | null
    livingSituation?: NullableEnumLivingSituationFieldUpdateOperationsInput | $Enums.LivingSituation | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    serviceContactPerson?: NullableStringFieldUpdateOperationsInput | string | null
    maritalStatus?: NullableEnumMaritalStatusFieldUpdateOperationsInput | $Enums.MaritalStatus | null
    lastEducation?: NullableEnumEducationLevelFieldUpdateOperationsInput | $Enums.EducationLevel | null
    isStillStudying?: NullableBoolFieldUpdateOperationsInput | boolean | null
    employmentStatus?: NullableEnumEmploymentStatusFieldUpdateOperationsInput | $Enums.EmploymentStatus | null
    jobDescription?: NullableStringFieldUpdateOperationsInput | string | null
    monthlyIncome?: NullableStringFieldUpdateOperationsInput | string | null
    hasOwnBusiness?: NullableBoolFieldUpdateOperationsInput | boolean | null
    hasReceivedSkillTraining?: NullableBoolFieldUpdateOperationsInput | boolean | null
    skillTrainingType?: NullableStringFieldUpdateOperationsInput | string | null
    desiredSkillTraining?: NullableStringFieldUpdateOperationsInput | string | null
    businessDetails?: NullableStringFieldUpdateOperationsInput | string | null
    hasBpjs?: BoolFieldUpdateOperationsInput | boolean
    bpjsId?: NullableStringFieldUpdateOperationsInput | string | null
    bpjsScanUrl?: NullableStringFieldUpdateOperationsInput | string | null
    healthServiceAccess?: NullableEnumHealthServiceAccessFieldUpdateOperationsInput | $Enums.HealthServiceAccess | null
    chronicIllness?: NullableStringFieldUpdateOperationsInput | string | null
    discriminationExperience?: NullableEnumDiscriminationExperienceFieldUpdateOperationsInput | $Enums.DiscriminationExperience | null
    discriminationType?: NullableStringFieldUpdateOperationsInput | string | null
    discriminationPerpetrator?: NullableStringFieldUpdateOperationsInput | string | null
    discriminationLocation?: NullableStringFieldUpdateOperationsInput | string | null
    wasDiscriminationReported?: NullableBoolFieldUpdateOperationsInput | boolean | null
    receivesSocialAssistance?: NullableBoolFieldUpdateOperationsInput | boolean | null
    isRegisteredInDTKS?: NullableBoolFieldUpdateOperationsInput | boolean | null
    communityGroup?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CommunityMemberUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    communityNickname?: NullableStringFieldUpdateOperationsInput | string | null
    placeOfBirth?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    age?: NullableIntFieldUpdateOperationsInput | number | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    genderIdentity?: NullableEnumGenderIdentityFieldUpdateOperationsInput | $Enums.GenderIdentity | null
    nik?: NullableStringFieldUpdateOperationsInput | string | null
    idScanUrl?: NullableStringFieldUpdateOperationsInput | string | null
    familyCardNumber?: NullableStringFieldUpdateOperationsInput | string | null
    ektpStatus?: NullableEnumEKTPStatusFieldUpdateOperationsInput | $Enums.EKTPStatus | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    domicileKelurahan?: NullableStringFieldUpdateOperationsInput | string | null
    domicileKecamatan?: NullableStringFieldUpdateOperationsInput | string | null
    domicileRegencyCity?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    residencyStatus?: NullableEnumResidencyStatusFieldUpdateOperationsInput | $Enums.ResidencyStatus | null
    livingSituation?: NullableEnumLivingSituationFieldUpdateOperationsInput | $Enums.LivingSituation | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    serviceContactPerson?: NullableStringFieldUpdateOperationsInput | string | null
    maritalStatus?: NullableEnumMaritalStatusFieldUpdateOperationsInput | $Enums.MaritalStatus | null
    lastEducation?: NullableEnumEducationLevelFieldUpdateOperationsInput | $Enums.EducationLevel | null
    isStillStudying?: NullableBoolFieldUpdateOperationsInput | boolean | null
    employmentStatus?: NullableEnumEmploymentStatusFieldUpdateOperationsInput | $Enums.EmploymentStatus | null
    jobDescription?: NullableStringFieldUpdateOperationsInput | string | null
    monthlyIncome?: NullableStringFieldUpdateOperationsInput | string | null
    hasOwnBusiness?: NullableBoolFieldUpdateOperationsInput | boolean | null
    hasReceivedSkillTraining?: NullableBoolFieldUpdateOperationsInput | boolean | null
    skillTrainingType?: NullableStringFieldUpdateOperationsInput | string | null
    desiredSkillTraining?: NullableStringFieldUpdateOperationsInput | string | null
    businessDetails?: NullableStringFieldUpdateOperationsInput | string | null
    hasBpjs?: BoolFieldUpdateOperationsInput | boolean
    bpjsId?: NullableStringFieldUpdateOperationsInput | string | null
    bpjsScanUrl?: NullableStringFieldUpdateOperationsInput | string | null
    healthServiceAccess?: NullableEnumHealthServiceAccessFieldUpdateOperationsInput | $Enums.HealthServiceAccess | null
    chronicIllness?: NullableStringFieldUpdateOperationsInput | string | null
    discriminationExperience?: NullableEnumDiscriminationExperienceFieldUpdateOperationsInput | $Enums.DiscriminationExperience | null
    discriminationType?: NullableStringFieldUpdateOperationsInput | string | null
    discriminationPerpetrator?: NullableStringFieldUpdateOperationsInput | string | null
    discriminationLocation?: NullableStringFieldUpdateOperationsInput | string | null
    wasDiscriminationReported?: NullableBoolFieldUpdateOperationsInput | boolean | null
    receivesSocialAssistance?: NullableBoolFieldUpdateOperationsInput | boolean | null
    isRegisteredInDTKS?: NullableBoolFieldUpdateOperationsInput | boolean | null
    communityGroup?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type EnumGenderNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel> | null
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel> | null
    not?: NestedEnumGenderNullableFilter<$PrismaModel> | $Enums.Gender | null
  }

  export type EnumGenderIdentityNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.GenderIdentity | EnumGenderIdentityFieldRefInput<$PrismaModel> | null
    in?: $Enums.GenderIdentity[] | ListEnumGenderIdentityFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.GenderIdentity[] | ListEnumGenderIdentityFieldRefInput<$PrismaModel> | null
    not?: NestedEnumGenderIdentityNullableFilter<$PrismaModel> | $Enums.GenderIdentity | null
  }

  export type EnumEKTPStatusNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.EKTPStatus | EnumEKTPStatusFieldRefInput<$PrismaModel> | null
    in?: $Enums.EKTPStatus[] | ListEnumEKTPStatusFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.EKTPStatus[] | ListEnumEKTPStatusFieldRefInput<$PrismaModel> | null
    not?: NestedEnumEKTPStatusNullableFilter<$PrismaModel> | $Enums.EKTPStatus | null
  }

  export type EnumResidencyStatusNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.ResidencyStatus | EnumResidencyStatusFieldRefInput<$PrismaModel> | null
    in?: $Enums.ResidencyStatus[] | ListEnumResidencyStatusFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.ResidencyStatus[] | ListEnumResidencyStatusFieldRefInput<$PrismaModel> | null
    not?: NestedEnumResidencyStatusNullableFilter<$PrismaModel> | $Enums.ResidencyStatus | null
  }

  export type EnumLivingSituationNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.LivingSituation | EnumLivingSituationFieldRefInput<$PrismaModel> | null
    in?: $Enums.LivingSituation[] | ListEnumLivingSituationFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.LivingSituation[] | ListEnumLivingSituationFieldRefInput<$PrismaModel> | null
    not?: NestedEnumLivingSituationNullableFilter<$PrismaModel> | $Enums.LivingSituation | null
  }

  export type EnumMaritalStatusNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.MaritalStatus | EnumMaritalStatusFieldRefInput<$PrismaModel> | null
    in?: $Enums.MaritalStatus[] | ListEnumMaritalStatusFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.MaritalStatus[] | ListEnumMaritalStatusFieldRefInput<$PrismaModel> | null
    not?: NestedEnumMaritalStatusNullableFilter<$PrismaModel> | $Enums.MaritalStatus | null
  }

  export type EnumEducationLevelNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.EducationLevel | EnumEducationLevelFieldRefInput<$PrismaModel> | null
    in?: $Enums.EducationLevel[] | ListEnumEducationLevelFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.EducationLevel[] | ListEnumEducationLevelFieldRefInput<$PrismaModel> | null
    not?: NestedEnumEducationLevelNullableFilter<$PrismaModel> | $Enums.EducationLevel | null
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type EnumEmploymentStatusNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.EmploymentStatus | EnumEmploymentStatusFieldRefInput<$PrismaModel> | null
    in?: $Enums.EmploymentStatus[] | ListEnumEmploymentStatusFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.EmploymentStatus[] | ListEnumEmploymentStatusFieldRefInput<$PrismaModel> | null
    not?: NestedEnumEmploymentStatusNullableFilter<$PrismaModel> | $Enums.EmploymentStatus | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type EnumHealthServiceAccessNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.HealthServiceAccess | EnumHealthServiceAccessFieldRefInput<$PrismaModel> | null
    in?: $Enums.HealthServiceAccess[] | ListEnumHealthServiceAccessFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.HealthServiceAccess[] | ListEnumHealthServiceAccessFieldRefInput<$PrismaModel> | null
    not?: NestedEnumHealthServiceAccessNullableFilter<$PrismaModel> | $Enums.HealthServiceAccess | null
  }

  export type EnumDiscriminationExperienceNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.DiscriminationExperience | EnumDiscriminationExperienceFieldRefInput<$PrismaModel> | null
    in?: $Enums.DiscriminationExperience[] | ListEnumDiscriminationExperienceFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.DiscriminationExperience[] | ListEnumDiscriminationExperienceFieldRefInput<$PrismaModel> | null
    not?: NestedEnumDiscriminationExperienceNullableFilter<$PrismaModel> | $Enums.DiscriminationExperience | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type CommunityMemberCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    firstName?: SortOrder
    middleName?: SortOrder
    lastName?: SortOrder
    communityNickname?: SortOrder
    placeOfBirth?: SortOrder
    dateOfBirth?: SortOrder
    age?: SortOrder
    gender?: SortOrder
    genderIdentity?: SortOrder
    nik?: SortOrder
    idScanUrl?: SortOrder
    familyCardNumber?: SortOrder
    ektpStatus?: SortOrder
    address?: SortOrder
    domicileKelurahan?: SortOrder
    domicileKecamatan?: SortOrder
    domicileRegencyCity?: SortOrder
    city?: SortOrder
    residencyStatus?: SortOrder
    livingSituation?: SortOrder
    phoneNumber?: SortOrder
    serviceContactPerson?: SortOrder
    maritalStatus?: SortOrder
    lastEducation?: SortOrder
    isStillStudying?: SortOrder
    employmentStatus?: SortOrder
    jobDescription?: SortOrder
    monthlyIncome?: SortOrder
    hasOwnBusiness?: SortOrder
    hasReceivedSkillTraining?: SortOrder
    skillTrainingType?: SortOrder
    desiredSkillTraining?: SortOrder
    businessDetails?: SortOrder
    hasBpjs?: SortOrder
    bpjsId?: SortOrder
    bpjsScanUrl?: SortOrder
    healthServiceAccess?: SortOrder
    chronicIllness?: SortOrder
    discriminationExperience?: SortOrder
    discriminationType?: SortOrder
    discriminationPerpetrator?: SortOrder
    discriminationLocation?: SortOrder
    wasDiscriminationReported?: SortOrder
    receivesSocialAssistance?: SortOrder
    isRegisteredInDTKS?: SortOrder
    communityGroup?: SortOrder
  }

  export type CommunityMemberAvgOrderByAggregateInput = {
    age?: SortOrder
  }

  export type CommunityMemberMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    firstName?: SortOrder
    middleName?: SortOrder
    lastName?: SortOrder
    communityNickname?: SortOrder
    placeOfBirth?: SortOrder
    dateOfBirth?: SortOrder
    age?: SortOrder
    gender?: SortOrder
    genderIdentity?: SortOrder
    nik?: SortOrder
    idScanUrl?: SortOrder
    familyCardNumber?: SortOrder
    ektpStatus?: SortOrder
    address?: SortOrder
    domicileKelurahan?: SortOrder
    domicileKecamatan?: SortOrder
    domicileRegencyCity?: SortOrder
    city?: SortOrder
    residencyStatus?: SortOrder
    livingSituation?: SortOrder
    phoneNumber?: SortOrder
    serviceContactPerson?: SortOrder
    maritalStatus?: SortOrder
    lastEducation?: SortOrder
    isStillStudying?: SortOrder
    employmentStatus?: SortOrder
    jobDescription?: SortOrder
    monthlyIncome?: SortOrder
    hasOwnBusiness?: SortOrder
    hasReceivedSkillTraining?: SortOrder
    skillTrainingType?: SortOrder
    desiredSkillTraining?: SortOrder
    businessDetails?: SortOrder
    hasBpjs?: SortOrder
    bpjsId?: SortOrder
    bpjsScanUrl?: SortOrder
    healthServiceAccess?: SortOrder
    chronicIllness?: SortOrder
    discriminationExperience?: SortOrder
    discriminationType?: SortOrder
    discriminationPerpetrator?: SortOrder
    discriminationLocation?: SortOrder
    wasDiscriminationReported?: SortOrder
    receivesSocialAssistance?: SortOrder
    isRegisteredInDTKS?: SortOrder
    communityGroup?: SortOrder
  }

  export type CommunityMemberMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    firstName?: SortOrder
    middleName?: SortOrder
    lastName?: SortOrder
    communityNickname?: SortOrder
    placeOfBirth?: SortOrder
    dateOfBirth?: SortOrder
    age?: SortOrder
    gender?: SortOrder
    genderIdentity?: SortOrder
    nik?: SortOrder
    idScanUrl?: SortOrder
    familyCardNumber?: SortOrder
    ektpStatus?: SortOrder
    address?: SortOrder
    domicileKelurahan?: SortOrder
    domicileKecamatan?: SortOrder
    domicileRegencyCity?: SortOrder
    city?: SortOrder
    residencyStatus?: SortOrder
    livingSituation?: SortOrder
    phoneNumber?: SortOrder
    serviceContactPerson?: SortOrder
    maritalStatus?: SortOrder
    lastEducation?: SortOrder
    isStillStudying?: SortOrder
    employmentStatus?: SortOrder
    jobDescription?: SortOrder
    monthlyIncome?: SortOrder
    hasOwnBusiness?: SortOrder
    hasReceivedSkillTraining?: SortOrder
    skillTrainingType?: SortOrder
    desiredSkillTraining?: SortOrder
    businessDetails?: SortOrder
    hasBpjs?: SortOrder
    bpjsId?: SortOrder
    bpjsScanUrl?: SortOrder
    healthServiceAccess?: SortOrder
    chronicIllness?: SortOrder
    discriminationExperience?: SortOrder
    discriminationType?: SortOrder
    discriminationPerpetrator?: SortOrder
    discriminationLocation?: SortOrder
    wasDiscriminationReported?: SortOrder
    receivesSocialAssistance?: SortOrder
    isRegisteredInDTKS?: SortOrder
    communityGroup?: SortOrder
  }

  export type CommunityMemberSumOrderByAggregateInput = {
    age?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type EnumGenderNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel> | null
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel> | null
    not?: NestedEnumGenderNullableWithAggregatesFilter<$PrismaModel> | $Enums.Gender | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumGenderNullableFilter<$PrismaModel>
    _max?: NestedEnumGenderNullableFilter<$PrismaModel>
  }

  export type EnumGenderIdentityNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.GenderIdentity | EnumGenderIdentityFieldRefInput<$PrismaModel> | null
    in?: $Enums.GenderIdentity[] | ListEnumGenderIdentityFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.GenderIdentity[] | ListEnumGenderIdentityFieldRefInput<$PrismaModel> | null
    not?: NestedEnumGenderIdentityNullableWithAggregatesFilter<$PrismaModel> | $Enums.GenderIdentity | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumGenderIdentityNullableFilter<$PrismaModel>
    _max?: NestedEnumGenderIdentityNullableFilter<$PrismaModel>
  }

  export type EnumEKTPStatusNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EKTPStatus | EnumEKTPStatusFieldRefInput<$PrismaModel> | null
    in?: $Enums.EKTPStatus[] | ListEnumEKTPStatusFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.EKTPStatus[] | ListEnumEKTPStatusFieldRefInput<$PrismaModel> | null
    not?: NestedEnumEKTPStatusNullableWithAggregatesFilter<$PrismaModel> | $Enums.EKTPStatus | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumEKTPStatusNullableFilter<$PrismaModel>
    _max?: NestedEnumEKTPStatusNullableFilter<$PrismaModel>
  }

  export type EnumResidencyStatusNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ResidencyStatus | EnumResidencyStatusFieldRefInput<$PrismaModel> | null
    in?: $Enums.ResidencyStatus[] | ListEnumResidencyStatusFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.ResidencyStatus[] | ListEnumResidencyStatusFieldRefInput<$PrismaModel> | null
    not?: NestedEnumResidencyStatusNullableWithAggregatesFilter<$PrismaModel> | $Enums.ResidencyStatus | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumResidencyStatusNullableFilter<$PrismaModel>
    _max?: NestedEnumResidencyStatusNullableFilter<$PrismaModel>
  }

  export type EnumLivingSituationNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LivingSituation | EnumLivingSituationFieldRefInput<$PrismaModel> | null
    in?: $Enums.LivingSituation[] | ListEnumLivingSituationFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.LivingSituation[] | ListEnumLivingSituationFieldRefInput<$PrismaModel> | null
    not?: NestedEnumLivingSituationNullableWithAggregatesFilter<$PrismaModel> | $Enums.LivingSituation | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumLivingSituationNullableFilter<$PrismaModel>
    _max?: NestedEnumLivingSituationNullableFilter<$PrismaModel>
  }

  export type EnumMaritalStatusNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MaritalStatus | EnumMaritalStatusFieldRefInput<$PrismaModel> | null
    in?: $Enums.MaritalStatus[] | ListEnumMaritalStatusFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.MaritalStatus[] | ListEnumMaritalStatusFieldRefInput<$PrismaModel> | null
    not?: NestedEnumMaritalStatusNullableWithAggregatesFilter<$PrismaModel> | $Enums.MaritalStatus | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumMaritalStatusNullableFilter<$PrismaModel>
    _max?: NestedEnumMaritalStatusNullableFilter<$PrismaModel>
  }

  export type EnumEducationLevelNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EducationLevel | EnumEducationLevelFieldRefInput<$PrismaModel> | null
    in?: $Enums.EducationLevel[] | ListEnumEducationLevelFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.EducationLevel[] | ListEnumEducationLevelFieldRefInput<$PrismaModel> | null
    not?: NestedEnumEducationLevelNullableWithAggregatesFilter<$PrismaModel> | $Enums.EducationLevel | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumEducationLevelNullableFilter<$PrismaModel>
    _max?: NestedEnumEducationLevelNullableFilter<$PrismaModel>
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type EnumEmploymentStatusNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EmploymentStatus | EnumEmploymentStatusFieldRefInput<$PrismaModel> | null
    in?: $Enums.EmploymentStatus[] | ListEnumEmploymentStatusFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.EmploymentStatus[] | ListEnumEmploymentStatusFieldRefInput<$PrismaModel> | null
    not?: NestedEnumEmploymentStatusNullableWithAggregatesFilter<$PrismaModel> | $Enums.EmploymentStatus | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumEmploymentStatusNullableFilter<$PrismaModel>
    _max?: NestedEnumEmploymentStatusNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EnumHealthServiceAccessNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.HealthServiceAccess | EnumHealthServiceAccessFieldRefInput<$PrismaModel> | null
    in?: $Enums.HealthServiceAccess[] | ListEnumHealthServiceAccessFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.HealthServiceAccess[] | ListEnumHealthServiceAccessFieldRefInput<$PrismaModel> | null
    not?: NestedEnumHealthServiceAccessNullableWithAggregatesFilter<$PrismaModel> | $Enums.HealthServiceAccess | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumHealthServiceAccessNullableFilter<$PrismaModel>
    _max?: NestedEnumHealthServiceAccessNullableFilter<$PrismaModel>
  }

  export type EnumDiscriminationExperienceNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DiscriminationExperience | EnumDiscriminationExperienceFieldRefInput<$PrismaModel> | null
    in?: $Enums.DiscriminationExperience[] | ListEnumDiscriminationExperienceFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.DiscriminationExperience[] | ListEnumDiscriminationExperienceFieldRefInput<$PrismaModel> | null
    not?: NestedEnumDiscriminationExperienceNullableWithAggregatesFilter<$PrismaModel> | $Enums.DiscriminationExperience | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumDiscriminationExperienceNullableFilter<$PrismaModel>
    _max?: NestedEnumDiscriminationExperienceNullableFilter<$PrismaModel>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableEnumGenderFieldUpdateOperationsInput = {
    set?: $Enums.Gender | null
  }

  export type NullableEnumGenderIdentityFieldUpdateOperationsInput = {
    set?: $Enums.GenderIdentity | null
  }

  export type NullableEnumEKTPStatusFieldUpdateOperationsInput = {
    set?: $Enums.EKTPStatus | null
  }

  export type NullableEnumResidencyStatusFieldUpdateOperationsInput = {
    set?: $Enums.ResidencyStatus | null
  }

  export type NullableEnumLivingSituationFieldUpdateOperationsInput = {
    set?: $Enums.LivingSituation | null
  }

  export type NullableEnumMaritalStatusFieldUpdateOperationsInput = {
    set?: $Enums.MaritalStatus | null
  }

  export type NullableEnumEducationLevelFieldUpdateOperationsInput = {
    set?: $Enums.EducationLevel | null
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type NullableEnumEmploymentStatusFieldUpdateOperationsInput = {
    set?: $Enums.EmploymentStatus | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableEnumHealthServiceAccessFieldUpdateOperationsInput = {
    set?: $Enums.HealthServiceAccess | null
  }

  export type NullableEnumDiscriminationExperienceFieldUpdateOperationsInput = {
    set?: $Enums.DiscriminationExperience | null
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumGenderNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel> | null
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel> | null
    not?: NestedEnumGenderNullableFilter<$PrismaModel> | $Enums.Gender | null
  }

  export type NestedEnumGenderIdentityNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.GenderIdentity | EnumGenderIdentityFieldRefInput<$PrismaModel> | null
    in?: $Enums.GenderIdentity[] | ListEnumGenderIdentityFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.GenderIdentity[] | ListEnumGenderIdentityFieldRefInput<$PrismaModel> | null
    not?: NestedEnumGenderIdentityNullableFilter<$PrismaModel> | $Enums.GenderIdentity | null
  }

  export type NestedEnumEKTPStatusNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.EKTPStatus | EnumEKTPStatusFieldRefInput<$PrismaModel> | null
    in?: $Enums.EKTPStatus[] | ListEnumEKTPStatusFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.EKTPStatus[] | ListEnumEKTPStatusFieldRefInput<$PrismaModel> | null
    not?: NestedEnumEKTPStatusNullableFilter<$PrismaModel> | $Enums.EKTPStatus | null
  }

  export type NestedEnumResidencyStatusNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.ResidencyStatus | EnumResidencyStatusFieldRefInput<$PrismaModel> | null
    in?: $Enums.ResidencyStatus[] | ListEnumResidencyStatusFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.ResidencyStatus[] | ListEnumResidencyStatusFieldRefInput<$PrismaModel> | null
    not?: NestedEnumResidencyStatusNullableFilter<$PrismaModel> | $Enums.ResidencyStatus | null
  }

  export type NestedEnumLivingSituationNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.LivingSituation | EnumLivingSituationFieldRefInput<$PrismaModel> | null
    in?: $Enums.LivingSituation[] | ListEnumLivingSituationFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.LivingSituation[] | ListEnumLivingSituationFieldRefInput<$PrismaModel> | null
    not?: NestedEnumLivingSituationNullableFilter<$PrismaModel> | $Enums.LivingSituation | null
  }

  export type NestedEnumMaritalStatusNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.MaritalStatus | EnumMaritalStatusFieldRefInput<$PrismaModel> | null
    in?: $Enums.MaritalStatus[] | ListEnumMaritalStatusFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.MaritalStatus[] | ListEnumMaritalStatusFieldRefInput<$PrismaModel> | null
    not?: NestedEnumMaritalStatusNullableFilter<$PrismaModel> | $Enums.MaritalStatus | null
  }

  export type NestedEnumEducationLevelNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.EducationLevel | EnumEducationLevelFieldRefInput<$PrismaModel> | null
    in?: $Enums.EducationLevel[] | ListEnumEducationLevelFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.EducationLevel[] | ListEnumEducationLevelFieldRefInput<$PrismaModel> | null
    not?: NestedEnumEducationLevelNullableFilter<$PrismaModel> | $Enums.EducationLevel | null
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedEnumEmploymentStatusNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.EmploymentStatus | EnumEmploymentStatusFieldRefInput<$PrismaModel> | null
    in?: $Enums.EmploymentStatus[] | ListEnumEmploymentStatusFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.EmploymentStatus[] | ListEnumEmploymentStatusFieldRefInput<$PrismaModel> | null
    not?: NestedEnumEmploymentStatusNullableFilter<$PrismaModel> | $Enums.EmploymentStatus | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedEnumHealthServiceAccessNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.HealthServiceAccess | EnumHealthServiceAccessFieldRefInput<$PrismaModel> | null
    in?: $Enums.HealthServiceAccess[] | ListEnumHealthServiceAccessFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.HealthServiceAccess[] | ListEnumHealthServiceAccessFieldRefInput<$PrismaModel> | null
    not?: NestedEnumHealthServiceAccessNullableFilter<$PrismaModel> | $Enums.HealthServiceAccess | null
  }

  export type NestedEnumDiscriminationExperienceNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.DiscriminationExperience | EnumDiscriminationExperienceFieldRefInput<$PrismaModel> | null
    in?: $Enums.DiscriminationExperience[] | ListEnumDiscriminationExperienceFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.DiscriminationExperience[] | ListEnumDiscriminationExperienceFieldRefInput<$PrismaModel> | null
    not?: NestedEnumDiscriminationExperienceNullableFilter<$PrismaModel> | $Enums.DiscriminationExperience | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumGenderNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel> | null
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel> | null
    not?: NestedEnumGenderNullableWithAggregatesFilter<$PrismaModel> | $Enums.Gender | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumGenderNullableFilter<$PrismaModel>
    _max?: NestedEnumGenderNullableFilter<$PrismaModel>
  }

  export type NestedEnumGenderIdentityNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.GenderIdentity | EnumGenderIdentityFieldRefInput<$PrismaModel> | null
    in?: $Enums.GenderIdentity[] | ListEnumGenderIdentityFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.GenderIdentity[] | ListEnumGenderIdentityFieldRefInput<$PrismaModel> | null
    not?: NestedEnumGenderIdentityNullableWithAggregatesFilter<$PrismaModel> | $Enums.GenderIdentity | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumGenderIdentityNullableFilter<$PrismaModel>
    _max?: NestedEnumGenderIdentityNullableFilter<$PrismaModel>
  }

  export type NestedEnumEKTPStatusNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EKTPStatus | EnumEKTPStatusFieldRefInput<$PrismaModel> | null
    in?: $Enums.EKTPStatus[] | ListEnumEKTPStatusFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.EKTPStatus[] | ListEnumEKTPStatusFieldRefInput<$PrismaModel> | null
    not?: NestedEnumEKTPStatusNullableWithAggregatesFilter<$PrismaModel> | $Enums.EKTPStatus | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumEKTPStatusNullableFilter<$PrismaModel>
    _max?: NestedEnumEKTPStatusNullableFilter<$PrismaModel>
  }

  export type NestedEnumResidencyStatusNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ResidencyStatus | EnumResidencyStatusFieldRefInput<$PrismaModel> | null
    in?: $Enums.ResidencyStatus[] | ListEnumResidencyStatusFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.ResidencyStatus[] | ListEnumResidencyStatusFieldRefInput<$PrismaModel> | null
    not?: NestedEnumResidencyStatusNullableWithAggregatesFilter<$PrismaModel> | $Enums.ResidencyStatus | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumResidencyStatusNullableFilter<$PrismaModel>
    _max?: NestedEnumResidencyStatusNullableFilter<$PrismaModel>
  }

  export type NestedEnumLivingSituationNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LivingSituation | EnumLivingSituationFieldRefInput<$PrismaModel> | null
    in?: $Enums.LivingSituation[] | ListEnumLivingSituationFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.LivingSituation[] | ListEnumLivingSituationFieldRefInput<$PrismaModel> | null
    not?: NestedEnumLivingSituationNullableWithAggregatesFilter<$PrismaModel> | $Enums.LivingSituation | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumLivingSituationNullableFilter<$PrismaModel>
    _max?: NestedEnumLivingSituationNullableFilter<$PrismaModel>
  }

  export type NestedEnumMaritalStatusNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MaritalStatus | EnumMaritalStatusFieldRefInput<$PrismaModel> | null
    in?: $Enums.MaritalStatus[] | ListEnumMaritalStatusFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.MaritalStatus[] | ListEnumMaritalStatusFieldRefInput<$PrismaModel> | null
    not?: NestedEnumMaritalStatusNullableWithAggregatesFilter<$PrismaModel> | $Enums.MaritalStatus | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumMaritalStatusNullableFilter<$PrismaModel>
    _max?: NestedEnumMaritalStatusNullableFilter<$PrismaModel>
  }

  export type NestedEnumEducationLevelNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EducationLevel | EnumEducationLevelFieldRefInput<$PrismaModel> | null
    in?: $Enums.EducationLevel[] | ListEnumEducationLevelFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.EducationLevel[] | ListEnumEducationLevelFieldRefInput<$PrismaModel> | null
    not?: NestedEnumEducationLevelNullableWithAggregatesFilter<$PrismaModel> | $Enums.EducationLevel | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumEducationLevelNullableFilter<$PrismaModel>
    _max?: NestedEnumEducationLevelNullableFilter<$PrismaModel>
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type NestedEnumEmploymentStatusNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EmploymentStatus | EnumEmploymentStatusFieldRefInput<$PrismaModel> | null
    in?: $Enums.EmploymentStatus[] | ListEnumEmploymentStatusFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.EmploymentStatus[] | ListEnumEmploymentStatusFieldRefInput<$PrismaModel> | null
    not?: NestedEnumEmploymentStatusNullableWithAggregatesFilter<$PrismaModel> | $Enums.EmploymentStatus | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumEmploymentStatusNullableFilter<$PrismaModel>
    _max?: NestedEnumEmploymentStatusNullableFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumHealthServiceAccessNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.HealthServiceAccess | EnumHealthServiceAccessFieldRefInput<$PrismaModel> | null
    in?: $Enums.HealthServiceAccess[] | ListEnumHealthServiceAccessFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.HealthServiceAccess[] | ListEnumHealthServiceAccessFieldRefInput<$PrismaModel> | null
    not?: NestedEnumHealthServiceAccessNullableWithAggregatesFilter<$PrismaModel> | $Enums.HealthServiceAccess | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumHealthServiceAccessNullableFilter<$PrismaModel>
    _max?: NestedEnumHealthServiceAccessNullableFilter<$PrismaModel>
  }

  export type NestedEnumDiscriminationExperienceNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DiscriminationExperience | EnumDiscriminationExperienceFieldRefInput<$PrismaModel> | null
    in?: $Enums.DiscriminationExperience[] | ListEnumDiscriminationExperienceFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.DiscriminationExperience[] | ListEnumDiscriminationExperienceFieldRefInput<$PrismaModel> | null
    not?: NestedEnumDiscriminationExperienceNullableWithAggregatesFilter<$PrismaModel> | $Enums.DiscriminationExperience | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumDiscriminationExperienceNullableFilter<$PrismaModel>
    _max?: NestedEnumDiscriminationExperienceNullableFilter<$PrismaModel>
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}