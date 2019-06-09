import React from 'react';
import { Tree, Icon } from 'antd';
import { MenuProvider, Menu, Item } from 'react-contexify';
import { arrayToTree } from '@jiumao/dharma';
import { IFolder } from '../models/images';
import 'react-contexify/dist/ReactContexify.min.css';

interface IProps {
  folders: IFolder[];
}

const { TreeNode } = Tree;

const FolderTree: React.FC<IProps> = props => {
  const { folders } = props;

  const loop = data => {
    return data.map(item => {
      const title = (
        <MenuProvider id="menu_id" style={{ display: 'inline-block' }} data-key={item.id}>
          <span>{item.title}</span>
        </MenuProvider>
      );

      if (item.children && item.children.length) {
        return (
          <TreeNode
            icon={({ selected }) => <Icon type={selected ? 'folder-open' : 'folder'} />}
            key={item.id}
            title={title}
          >
            {loop(item.children)}
          </TreeNode>
        );
      }
      return (
        <TreeNode
          key={item.id}
          icon={({ selected }) => <Icon type={selected ? 'folder-open' : 'folder'} />}
          title={title}
        />
      );
    });
  };

  const folderTreeData = arrayToTree(folders);

  return (
    <div>
      <Tree showLine showIcon>
        {loop(folderTreeData)}
      </Tree>
      <Menu id="menu_id">
        <Item>菜单项</Item>
        <Item>菜单项</Item>
      </Menu>
    </div>
  );
};

FolderTree.defaultProps = {
  folders: [],
};

export default FolderTree;
