import { Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_ } from 'typeorm'

@Entity_()
export class VeHolder {
  constructor(props?: Partial<VeHolder>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Column_('text', { nullable: false })
  address!: string

  @Column_('numeric', { nullable: false })
  updatedAt!: bigint
}
