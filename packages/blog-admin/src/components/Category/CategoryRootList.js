import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import history from '@/utils/history'
import { Add } from '@/common/BaseImg'
import CategoryItem from './CategoryItem'
import { getRootCategories } from './module'


const CategoryRootList = ({ rootCategories }) =>
  (
    <Wrap>
      <List>
        {rootCategories.map((t, i) => <li key={t._id}><CategoryItem data={t} index={i + 1} /></li>)}
      </List>
      <StyledAdd width="46" height="46" onClick={() => { history.push('/categories/0/add') }} />
    </Wrap>
  )

CategoryRootList.propTypes = {
  rootCategories: PropTypes.arrayOf(PropTypes.object)
}
CategoryRootList.defaultProps = {
  rootCategories: []
}
const mapStateToProps = state => ({
  rootCategories: getRootCategories(state)
})
export default connect(mapStateToProps)(CategoryRootList)

const Wrap = styled.ul`
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
`
const List = styled.ul`
  height: calc(100% - 40px);
  overflow: auto;
  line-height: 50px;
`
const StyledAdd = styled(Add)`
  position: absolute;
  bottom: 60px;
  right: 26px;
  fill: rgba(0, 0, 0, .4);
  cursor: pointer;
`
