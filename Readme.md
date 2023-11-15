## Get Version

A small attempt to write a custom Github Action to return the version of my releases as I build them.

*Essentially* a learning exercise in NodeJS, Github Actions, and can I do it.

Example usage:

```yml
      - name: Get Version from Tag
        id: getversion
        uses: wayne-mj/getversion@${version}
        with:
          version-format: 'with-v'
      
      - name: Use rel_version in workflow
        run: echo "The extracted rel_version is ${{ steps.getversion.outputs.rel_version }}"          
```

```yml
      - name: Get Version from Tag
        id: getversion
        uses: wayne-mj/getversion@${version}
        with:
          version-format: 'without-v'
      
      - name: Use rel_version in workflow
        run: echo "The extracted rel_version is ${{ steps.getversion.outputs.rel_version }}"          
```

```yml
      - name: Get Version from Tag
        id: getversion
        uses: wayne-mj/getversion@${version}

      - name: Use rel_version in workflow
        run: echo "The extracted rel_version is ${{ steps.getversion.outputs.rel_version }}"        
```

Example output without-v:
```
2023-07-28T10:09:38.3516710Z Tag name: v0.0.1
2023-07-28T10:09:38.3519926Z Formatted version: 0.0.1
2023-07-28T10:09:38.3520770Z Tags were found: true
...
2023-07-28T10:09:38.3804583Z echo "The extracted rel_version is 0.0.1"
2023-07-28T10:09:38.4071159Z The extracted rel_version is 0.0.1
```

Example output with-v
```
2023-07-28T10:09:36.4616981Z Tag name: v0.0.1
2023-07-28T10:09:36.4624001Z Formatted version: v0.0.1
2023-07-28T10:09:36.4624822Z Tags were found: true
...
2023-07-28T10:09:36.4837553Z echo "The extracted rel_version is v0.0.1"
2023-07-28T10:09:36.5069342Z The extracted rel_version is v0.0.1
```

Example output if no tags are present
```
2023-07-28T10:44:26.8642824Z Tags were found: false
...
2023-07-28T10:44:26.8864589Z echo "The extracted rel_version is "
2023-07-28T10:44:26.9081762Z The extracted rel_version is
```