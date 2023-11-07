import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import history from '@/utils/history'
import BaseFullScreen from '@/common/BaseFullScreen'
import ButtonBox from '@/common/ButtonBox'
import BaseInput from '@/common/BaseInput'
import BaseMask from '@/common/BaseMask'
import BaseTextArea from '@/common/BaseTextArea'
import { getParentNumber } from '@/utils/util'
import { showAlertText, hideAlertText } from '@/components/Alert/module'
import {
  setCategoriesFilter,
  getCategoryByFilter,
  addCategoryAsync,
  updateCategoryAsync,
  getCategoryNextParentNumber,
  getNewChildCategoryNumberByNumber
} from './module'

class CategoryForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      description: '',
      index: ''
    }
  }

  componentDidMount() {
    const { operate, match, setCategoriesFilter } = this.props
    // 当没有match.params.id的时候是更新大类
    match.params.id !== 0 && setCategoriesFilter(Number(match.params.id)).then(() => {
      if (operate === 'update') {
        const { category } = this.props
        const { name, description } = category
        if (name) {
          this.setState({ name, description })
        } else {
          history.push(`/categories/${getParentNumber(Number(match.params.id))}`)
        }
      }
    })
  }
  onConfirmClick = () => {
    const {
      operate,
      match,
      addCategoryAsync,
      updateCategoryAsync,
      newParentCategoryNumber,
      newChildCategoryNumber,
      showAlertText,
      hideAlertText
    } = this.props
    const { id } = match.params
    const { name, description, index } = this.state
    console.log('=====newChildCategoryNumber', id, newParentCategoryNumber, newChildCategoryNumber)
    // 新增子项目，
    if (operate === 'add') {
      const addParent = id === '0'
      // 如果要新增的子级类别数字返回假值，则进行报错
      if (!addParent && Number.isNaN(newChildCategoryNumber)) {
        showAlertText('类别超过最深层级，无法新增！')
        setTimeout(() => {
          hideAlertText()
        }, 2000)
      } else {
        const data = { name, description, number: addParent ? newParentCategoryNumber : newChildCategoryNumber }
        if (index) data.index = index
        addCategoryAsync(data).then(() => {
          addParent ? history.goBack() : history.push(`/categories/${getParentNumber(newChildCategoryNumber)}`)
        })
      }
    } else {
      const data = { name, description, number: Number(id) }
      if (index) data.index = index
      updateCategoryAsync({ name, description, number: Number(id) }).then(() => {
        history.goBack()
      })
    }
  }
  render() {
    const { name, description, index } = this.state
    return (
      <BaseFullScreen>
        <BaseMask />
        <Inner>
          <StyledInput
            value={name}
            onChange={e => this.setState({ name: e.target.value })}
            placeholder="标题"
          />
          <StyledTextArea
            value={description}
            onChange={e => this.setState({ description: e.target.value })}
            placeholder="描述"
          />
          <StyledInput
            value={index}
            onChange={e => this.setState({ index: String(e.target.value) })}
            placeholder="排序"
          />
          <ButtonBox onConfirmClick={this.onConfirmClick} cancelColor="#fff" />
        </Inner>
      </BaseFullScreen>
    )
  }
}
CategoryForm.propTypes = {
  operate: PropTypes.string.isRequired,
  addCategoryAsync: PropTypes.func.isRequired,
  updateCategoryAsync: PropTypes.func.isRequired,
  setCategoriesFilter: PropTypes.func.isRequired,
  showAlertText: PropTypes.func.isRequired,
  hideAlertText: PropTypes.func.isRequired,
  newParentCategoryNumber: PropTypes.number,
  newChildCategoryNumber: PropTypes.number,
  match: PropTypes.shape({
    exact: PropTypes.bool,
    params: PropTypes.object,
    path: PropTypes.string,
    url: PropTypes.string
  }).isRequired,
  category: PropTypes.shape({
    _id: PropTypes.string,
    count: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    posts: PropTypes.array
  })
}
CategoryForm.defaultProps = {
  newParentCategoryNumber: NaN,
  newChildCategoryNumber: NaN,
  category: null
}
const mapStateToProps = state => ({
  newParentCategoryNumber: getCategoryNextParentNumber(state),
  newChildCategoryNumber: getNewChildCategoryNumberByNumber(state),
  category: getCategoryByFilter(state)
})
export default connect(mapStateToProps, {
  setCategoriesFilter,
  addCategoryAsync,
  updateCategoryAsync,
  showAlertText,
  hideAlertText
})(CategoryForm)

const Inner = styled.div`
  position: relative;
  box-sizing: border-box;
  max-width: 960px;
  padding: 20px 10px;
  margin: 50px auto;
  border-radius: 4px;
  background: rgba(255, 255, 255, .1);
  & ::placeholder {
    font-size: 1.1em;
    color: #fff;
  }
`
const StyledInput = styled(BaseInput)`
  margin: 10px 0;
  color: rgba(0, 0, 0, .8);
  background: none;
`
const StyledTextArea = styled(BaseTextArea)`
  height: 200px;
  margin: 10px 0;
  color: rgba(0, 0, 0, .8);
  background: none;
`
