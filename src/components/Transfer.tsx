import { useState } from 'react'
import './Transfer.css'

interface TransferProps {
  titles: [string, string]
  data: { key: string; title: string }[]
  targetKeys?: string[]
  onChange?: (keys: string[], direction: 'left' | 'right') => void
}

const Transfer = (props: TransferProps) => {
  const { data, titles, targetKeys = [], onChange } = props
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])

  const dataKeys = data
    .filter(({ key }) => !targetKeys.includes(key))
    .map((item) => item.key)

  const targeData = data.filter((item) => targetKeys.includes(item.key)) || []

  const sourceSelectedKeys = selectedKeys.filter((item) =>
    dataKeys.includes(item)
  )
  const targetSelectedKeys = selectedKeys.filter((item) =>
    targetKeys.includes(item)
  )

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedKeys(Array.from(new Set([...selectedKeys, e.target.value])))
    } else {
      setSelectedKeys(selectedKeys.filter((item) => item !== e.target.value))
    }
  }

  return (
    <div className="transfer">
      <div className="transferList">
        <div className="transferTitle">{titles[0]}</div>
        {data
          .filter(({ key }) => !targetKeys.includes(key))
          .map(({ key, title }) => (
            <div key={key} className="transferContent">
              <input
                type="checkbox"
                onChange={handleCheckboxChange}
                value={key}
              />
              <span>{title}</span>
            </div>
          ))}
      </div>

      <div className="transferButton">
        <button
          disabled={!targetSelectedKeys.length}
          onClick={() => {
            onChange?.(
              targetKeys.filter((item) => !targetSelectedKeys.includes(item)),
              'left'
            )
            setSelectedKeys(
              selectedKeys.filter((item) => sourceSelectedKeys.includes(item))
            )
          }}
        >
          ⇦
        </button>
        <button
          disabled={!sourceSelectedKeys.length}
          onClick={() => {
            onChange?.([...sourceSelectedKeys, ...targetKeys], 'right')
            setSelectedKeys(
              selectedKeys.filter((item) => targetSelectedKeys.includes(item))
            )
          }}
        >
          ⇨
        </button>
      </div>

      <div className="transferTarge">
        <div>{titles[1]}</div>
        {targeData.map(({ key, title }) => (
          <div key={key} className="transferContent">
            <input
              type="checkbox"
              onChange={handleCheckboxChange}
              value={key}
            />
            <span>{title}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Transfer
