import React, { useState } from 'react'
import './App.css'
import Transfer from './components/Transfer'

function App() {
  const [targetKeys, setTargetKeys] = useState<string[]>([])
  const handleChange = (keys: string[]) => {
    setTargetKeys(keys)
  }
  return (
    <div className="App">
      <Transfer
        data={[
          { key: '1', title: 'title1' },
          { key: '2', title: 'title2' },
          { key: '3', title: 'title3' },
          { key: '4', title: 'title4' },
        ]}
        titles={['左边', '右边']}
        onChange={handleChange}
        targetKeys={targetKeys}
      />
    </div>
  )
}

export default App
