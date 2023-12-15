import React from 'react'
import { Badge, Descriptions } from 'antd'

export const Description = ({ item }) => {
  console.log(item);
  const {arrendar} = item;

  const items = [
    {
      key: '1',
      label: 'Nombre',
      children: <span>
        {
          arrendar.user.name
        }
      </span>,
    },
    {
      key: '2',
      label: 'Correo Electronico',
      children: <span>
        {
          arrendar.user.email
        }
      </span>,
    },
    {
      key: '5',
      label: 'Telefono',
      children: <span>
        {
          arrendar.user.phone
        }
      </span>,
      span: 2,
    },
    {
      key: '4',
      label: 'Nombre Propiedad',
      children: <span>
      {
        item.name
      }
    </span>,
    },
    {
      key: '5',
      label: 'Direccion',
      children: <span>
        {
          item.adress
        }
      </span>,
      span: 2,
    },
    {
      key: '5',
      label: 'Tipo',
      children: <span>
        {
          item.type
        }
      </span>
    },
    {
      key: '6',
      label: 'Status',
      children: <Badge status="success" text="Arrendada" />,
      span: 3,
    },
    {
      key: '7',
      label: 'Precio',
      children: <span>$ 
        {
          item.price
        }
      </span>,
    }
  ];

  return (
    <div className='desc'>
      {
        item ?  <Descriptions title="User Info" bordered items={items} /> : <div className="hola">
          asjdasd
        </div>
      }
    </div>
  )
}
