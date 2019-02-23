import React from 'react'
import { mount, shallow } from 'enzyme'
import ControlPanelVm from '../components/ControlPanelVm'
import ControlPanel from '../components/ControlPanel'
import { Observer } from 'mobx-react'

jest.mock('../components/ControlPanelVm')

describe('<ControlPanel />', () => {
  const depth = 5
  const depthOptions = [5, 10, 20]
  const subscribedTopics = ['abcxyz@ticker']
  const selectEventUidByTopic = jest.fn(() => 'foo')

  ControlPanelVm.mockImplementation(() => ({
    depth,
    depthOptions,
    subscribedTopics,
    selectEventUidByTopic,
    onSelectDepth: () => {},
  }))

  beforeEach(() => {
    selectEventUidByTopic.mockClear()
  })

  it('shallow test', () => {
    const wrapper = shallow(<ControlPanel.wrappedComponent appState={{}} webSocketState={{}}/>)
    expect(wrapper.find(`select[value=${depth}]`).length).toBe(1)
    expect(wrapper.find('option').children().length).toBe(3)
    expect(wrapper.find('option').containsAllMatchingElements(depthOptions)).toBe(true)

    expect(wrapper.find(Observer).children().length).toBe(1)

    // not yet call & .dive() will trigger
    expect(selectEventUidByTopic.mock.calls.length).toBe(0)
    expect(wrapper.find(Observer).dive().contains(<li>abcxyz@ticker(event uid:foo)</li>)).toBe(true)
    expect(selectEventUidByTopic.mock.calls.length).toBe(1)
  })

  it('full dom test', () => {
    const wrapper = mount(<ControlPanel appState={{}} webSocketState={{}}/>)

    // immediate call
    expect(selectEventUidByTopic.mock.calls.length).toBe(1)
    expect(wrapper.find('option').length).toBe(3)
    expect(wrapper.find('option').containsAllMatchingElements(depthOptions)).toBe(true)
    expect(wrapper.find('li').length).toBe(1)
    expect(wrapper.find('li').text()).toBe('abcxyz@ticker(event uid:foo)')

  })
})
